import * as admin from 'firebase-admin';
import * as path from 'path';

const sdkPath = process.env.FIREBASE_ADMIN_SDK_PATH;

if (!sdkPath) {
  throw new Error('FIREBASE_ADMIN_SDK_PATH is not defined in environment variables');
}

// If sdkPath is relative, resolve relative to project root or __dirname.
// If sdkPath is absolute, use it directly.
const resolvedPath = path.isAbsolute(sdkPath) ? sdkPath : path.resolve(__dirname, sdkPath);

admin.initializeApp({
  credential: admin.credential.cert(resolvedPath),
});

export default admin;
