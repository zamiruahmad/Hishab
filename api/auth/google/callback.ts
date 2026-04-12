import { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
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

    client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: client });
    let userInfo = null;
    try {
      const userInfoResponse = await oauth2.userinfo.get();
      userInfo = userInfoResponse.data;
    } catch (err) {
      console.error('Failed to fetch Google user info:', err);
    }
    
    // Send tokens back to client via postMessage and close popup
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'GOOGLE_AUTH_SUCCESS', 
                tokens: ${JSON.stringify(tokens)},
                user: ${JSON.stringify(userInfo)}
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
}
