import { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { tokens, data, fileName } = req.body;

  console.log('Backup request received for file:', fileName);

  if (!tokens || !data) {
    console.error('Backup failed: Missing tokens or data');
    return res.status(400).json({ error: 'Missing tokens or data' });
  }

  if (!process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Backup failed: GOOGLE_CLIENT_SECRET is not set in environment');
    return res.status(500).json({ error: 'Server configuration error: GOOGLE_CLIENT_SECRET missing' });
  }

  try {
    const client = new google.auth.OAuth2(
      process.env.VITE_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    if (!tokens.refresh_token) {
      console.warn('Backup request missing refresh token.');
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
      res.status(200).json({ success: true, message: 'Backup updated' });
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
      res.status(200).json({ success: true, message: 'Backup created' });
    }
  } catch (error: any) {
    console.error('Error backing up to Drive:', error);
    let errorMessage = error?.message || String(error);
    
    // Handle common Google Auth errors
    if (errorMessage.toLowerCase().includes('refresh token') || 
        errorMessage.includes('invalid_grant') || 
        errorMessage.includes('No refresh token is set') ||
        errorMessage.includes('invalid_token') ||
        errorMessage.toLowerCase().includes('invalid authentication credentials')) {
      return res.status(401).json({ 
        error: 'Google Drive connection expired or invalid. Please disconnect and reconnect Google Drive in Settings.',
        code: 'AUTH_EXPIRED'
      });
    }
    
    res.status(500).json({ error: errorMessage });
  }
}
