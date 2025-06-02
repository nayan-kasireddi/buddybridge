import * as admin from 'firebase-admin';

const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
if (!serviceAccountJSON) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set');
}

const serviceAccount = JSON.parse(serviceAccountJSON);

// Fix escaped newlines in private key for proper PEM format
if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;