import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // 1. Get Google Auth URL
  app.get('/api/auth/google/url', (req, res) => {
    const origin = req.headers.referer || req.headers.origin;
    console.log('Auth request from origin:', origin);

    // If GOOGLE_REDIRECT_URI is not set, try to guess it from the referer
    let currentRedirectUri = process.env.GOOGLE_REDIRECT_URI;
    if (!currentRedirectUri && origin) {
      try {
        const url = new URL(origin);
        currentRedirectUri = `${url.protocol}//${url.host}/auth/google/callback`;
        console.log('Guessed redirect URI:', currentRedirectUri);
      } catch (e) {
        console.error('Error parsing origin for redirect URI:', e);
      }
    }

    // Update the client's redirect URI for this request
    const client = new google.auth.OAuth2(
      process.env.VITE_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      currentRedirectUri || `https://ais-dev-4jn34g6oe7w4gngyrdg7pj-712773840993.asia-southeast1.run.app/auth/google/callback`
    );

    const scopes = [
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    const url = client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
      include_granted_scopes: true
    });

    res.json({ url });
  });

  // 2. Google Auth Callback
  app.get(['/auth/google/callback', '/auth/google/callback/'], async (req, res) => {
    const { code } = req.query;
    const host = req.headers.host;
    const protocol = req.protocol;
    const currentRedirectUri = process.env.GOOGLE_REDIRECT_URI || `${protocol}://${host}/auth/google/callback`;

    console.log('Callback received. Host:', host, 'Redirect URI used:', currentRedirectUri);

    if (!code) {
      return res.status(400).send('No code provided');
    }

    try {
      const client = new google.auth.OAuth2(
        process.env.VITE_GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        currentRedirectUri
      );

      const { tokens } = await client.getToken(code as string);
      
      console.log('Tokens received from Google:', {
        has_access_token: !!tokens.access_token,
        has_refresh_token: !!tokens.refresh_token,
        expiry_date: tokens.expiry_date
      });
      
      // Send tokens back to client via postMessage and close popup
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ 
                  type: 'GOOGLE_AUTH_SUCCESS', 
                  tokens: ${JSON.stringify(tokens)} 
                }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (error: any) {
      console.error('Error exchanging code for tokens:', error);
      res.status(500).send(`Authentication failed: ${error.message}`);
    }
  });

  // 3. Backup to Google Drive
  app.post('/api/drive/backup', async (req, res) => {
    const { tokens, data, fileName } = req.body;

    if (!tokens || !data) {
      return res.status(400).json({ error: 'Missing tokens or data' });
    }

    try {
      const client = new google.auth.OAuth2(
        process.env.VITE_GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );

      if (!tokens.refresh_token) {
        console.warn('Backup request missing refresh token. If the access token is expired, this will fail.');
      }

      client.setCredentials(tokens);
      const drive = google.drive({ version: 'v3', auth: client });

      // Check if file already exists
      const listResponse = await drive.files.list({
        q: `name = '${fileName || 'backup.json'}' and trashed = false`,
        fields: 'files(id, name)',
        spaces: 'drive'
      });

      const files = listResponse.data.files;
      const fileContent = JSON.stringify(data);

      if (files && files.length > 0) {
        // Update existing file
        const fileId = files[0].id!;
        await drive.files.update({
          fileId: fileId,
          media: {
            mimeType: 'application/json',
            body: fileContent
          }
        });
        res.json({ success: true, message: 'Backup updated' });
      } else {
        // Create new file
        await drive.files.create({
          requestBody: {
            name: fileName || 'backup.json',
            mimeType: 'application/json'
          },
          media: {
            mimeType: 'application/json',
            body: fileContent
          }
        });
        res.json({ success: true, message: 'Backup created' });
      }
    } catch (error: any) {
      console.error('Error backing up to Drive:', error);
      let errorMessage = error.message;
      if (errorMessage.includes('Refresh Token Not Found')) {
        errorMessage = 'Google Drive connection expired or invalid. Please disconnect and reconnect Google Drive in Settings.';
      }
      res.status(500).json({ error: errorMessage });
    }
  });

  // 4. Restore from Google Drive
  app.post('/api/drive/restore', async (req, res) => {
    const { tokens, fileName } = req.body;

    if (!tokens) {
      return res.status(400).json({ error: 'Missing tokens' });
    }

    try {
      const client = new google.auth.OAuth2(
        process.env.VITE_GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
      );

      if (!tokens.refresh_token) {
        console.warn('Restore request missing refresh token.');
      }

      client.setCredentials(tokens);
      const drive = google.drive({ version: 'v3', auth: client });

      const listResponse = await drive.files.list({
        q: `name = '${fileName || 'backup.json'}' and trashed = false`,
        fields: 'files(id, name)',
        spaces: 'drive'
      });

      const files = listResponse.data.files;
      if (!files || files.length === 0) {
        return res.status(404).json({ error: 'Backup file not found' });
      }

      const fileId = files[0].id!;
      const fileResponse = await drive.files.get({
        fileId: fileId,
        alt: 'media'
      });

      res.json({ data: fileResponse.data });
    } catch (error: any) {
      console.error('Error restoring from Drive:', error);
      let errorMessage = error.message;
      if (errorMessage.includes('Refresh Token Not Found')) {
        errorMessage = 'Google Drive connection expired or invalid. Please disconnect and reconnect Google Drive in Settings.';
      }
      res.status(500).json({ error: errorMessage });
    }
  });

  // --- Vite Middleware ---

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
