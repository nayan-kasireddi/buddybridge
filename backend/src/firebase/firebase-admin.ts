import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const config = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON!);
  if (config.private_key) {
    config.private_key = config.private_key.replace(/\\n/g, '\n');
  }

  admin.initializeApp({
    credential: admin.credential.cert(config),
  });
}

export default admin;
