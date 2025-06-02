import * as admin from 'firebase-admin';

const firebaseConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}');

// Fix escaped newlines in private key
if (firebaseConfig.private_key) {
  firebaseConfig.private_key = firebaseConfig.private_key.replace(/\\n/g, '\n');
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});


export default admin;
