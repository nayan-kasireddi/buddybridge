// src/firebase/firebase-admin.ts
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

const serviceAccountPath = process.env.FIREBASE_ADMIN_SDK_PATH;
console.log('FIREBASE_ADMIN_SDK_PATH:', process.env.FIREBASE_ADMIN_SDK_PATH);

if (!serviceAccountPath) {
  throw new Error('FIREBASE_ADMIN_SDK_PATH is not defined in .env');
}

const serviceAccount = JSON.parse(
  readFileSync(join(process.cwd(), serviceAccountPath), 'utf8'),
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
