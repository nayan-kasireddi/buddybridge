import admin from './firebase-admin';
import { Injectable } from '@nestjs/common';

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

  async listAllUsers(): Promise<any[]> {
    const users: any[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
      const result = await admin.auth().listUsers(1000, nextPageToken);
      users.push(...result.users);
      nextPageToken = result.pageToken;
    } while (nextPageToken);

    return users.map(user => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: user.customClaims?.role ?? null
    }));
  }
}
