import { Injectable } from '@nestjs/common';
import { admin } from './firebase-admin';

@Injectable()
export class FirebaseAuthService {
  async setUserRole(uid: string, role: string): Promise<void> {
    await admin.auth().setCustomUserClaims(uid, { role });
  }

  async getUserRole(uid: string): Promise<string | null> {
    const user = await admin.auth().getUser(uid);
    const role = user.customClaims?.role as string | undefined;
    return role ?? null;
  }

  async verifyToken(idToken: string) {
    return admin.auth().verifyIdToken(idToken);
  }
}
