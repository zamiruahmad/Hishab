import { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { tokens, fileName } = req.body;

  if (!tokens) {
    return res.status(400).json({ error: 'Missing tokens' });
  }

  try {
    const client = new google.auth.OAuth2(
      process.env.VITE_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
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

    res.status(200).json({ data: fileResponse.data });
  } catch (error: any) {
    console.error('Error restoring from Drive:', error);
    let errorMessage = error?.message || String(error);
    
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
