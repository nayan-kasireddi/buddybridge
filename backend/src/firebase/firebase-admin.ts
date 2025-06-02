import * as admin from 'firebase-admin';

const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!serviceAccountJSON) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON env var is not set');
}

const serviceAccount = JSON.parse(serviceAccountJSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
