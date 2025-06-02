import * as admin from 'firebase-admin';

const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}';
console.log('Env var length:', serviceAccountJson.length);
const serviceAccount = JSON.parse(serviceAccountJson);

if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}

console.log('Private key length:', serviceAccount.private_key?.length);
console.log('Service account keys:', Object.keys(serviceAccount));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
