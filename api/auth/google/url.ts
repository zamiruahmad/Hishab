import { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.referer || req.headers.origin;
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  
  console.log('Auth URL request:', { origin, host, protocol });

  // If GOOGLE_REDIRECT_URI is not set, try to guess it
  let currentRedirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!currentRedirectUri) {
    if (origin) {
      try {
        const url = new URL(origin);
        currentRedirectUri = `${url.protocol}//${url.host}/auth/google/callback`;
      } catch (e) {
        console.error('Error parsing origin for redirect URI:', e);
      }
    }
    
    if (!currentRedirectUri && host) {
      currentRedirectUri = `${protocol}://${host}/auth/google/callback`;
    }
  }
  
  console.log('Using redirect URI for Auth URL:', currentRedirectUri);

  const client = new google.auth.OAuth2(
    process.env.VITE_GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    currentRedirectUri
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

  res.status(200).json({ url });
}
