import { google } from 'googleapis';

async function test() {
  const client = new google.auth.OAuth2(
    'dummy_client_id',
    'dummy_client_secret',
    'http://localhost:3000/auth/google/callback'
  );

  client.setCredentials({
    access_token: 'dummy_access_token',
    expiry_date: 1 // expired
  });

  const drive = google.drive({ version: 'v3', auth: client });
  try {
    await drive.files.list();
  } catch (e: any) {
    console.log("ERROR MESSAGE:", e.message);
  }
}

test();
