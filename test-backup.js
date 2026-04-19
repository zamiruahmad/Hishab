import http from 'http';

const data = JSON.stringify({
  tokens: {
    access_token: 'dummy',
    refresh_token: 'dummy',
    expiry_date: Date.now() + 3600000
  },
  data: { test: 1 },
  fileName: 'test.json'
});

const req = http.request('http://localhost:3000/api/drive/backup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', body));
});

req.on('error', console.error);
req.write(data);
req.end();
