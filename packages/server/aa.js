import { google } from 'googleapis';
import readline from 'readline';

const CLIENT_ID =
  '601557939255-rb7snc2tt86tadj9m9r0jtb9msf0udaf.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/youtube.upload'],
});

console.log('Authorize this app by visiting this url:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', (code) => {
  rl.close();

  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.error('Error retrieving access token', err);
      return;
    }

    console.log('Access Token:', tokens.access_token);
    console.log('\n');
    console.log('Refresh Token:', tokens.refresh_token);
  });
});
