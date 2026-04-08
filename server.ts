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

  const oauth2Client = new google.auth.OAuth2(
    process.env.VITE_GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || `https://ais-dev-4jn34g6oe7w4gngyrdg7pj-712773840993.asia-southeast1.run.app/auth/google/callback`
  );

  // --- API Routes ---

  // 1. Get Google Auth URL
  app.get('/api/auth/google/url', (req, res) => {
    const scopes = [
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });

    res.json({ url });
  });

  // 2. Google Auth Callback
  app.get(['/auth/google/callback', '/auth/google/callback/'], async (req, res) => {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send('No code provided');
    }

    try {
      const { tokens } = await oauth2Client.getToken(code as string);
      
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
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      res.status(500).send('Authentication failed');
    }
  });

  // 3. Backup to Google Drive
  app.post('/api/drive/backup', async (req, res) => {
    const { tokens, data, fileName } = req.body;

    if (!tokens || !data) {
      return res.status(400).json({ error: 'Missing tokens or data' });
    }

    try {
      oauth2Client.setCredentials(tokens);
      const drive = google.drive({ version: 'v3', auth: oauth2Client });

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
      res.status(500).json({ error: error.message });
    }
  });

  // 4. Restore from Google Drive
  app.post('/api/drive/restore', async (req, res) => {
    const { tokens, fileName } = req.body;

    if (!tokens) {
      return res.status(400).json({ error: 'Missing tokens' });
    }

    try {
      oauth2Client.setCredentials(tokens);
      const drive = google.drive({ version: 'v3', auth: oauth2Client });

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
      res.status(500).json({ error: error.message });
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
