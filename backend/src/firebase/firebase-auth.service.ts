import admin from './firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAuthService {
  async setUserRole(uid: string, role: string): Promise<void> {
    try {
      await admin.auth().setCustomUserClaims(uid, { role });
    } catch (error) {
      console.error('Error setting user role:', error);
      throw error;
    }
  }

  async getUserRole(uid: string): Promise<string | null> {
    try {
      const user = await admin.auth().getUser(uid);
      const role = user.customClaims?.role as string | undefined;
      return role ?? null;
    } catch (error) {
      console.error('Error getting user role:', error);
      throw error;
    }
  }

  async verifyToken(idToken: string) {
    try {
      return admin.auth().verifyIdToken(idToken);
    } catch (error) {
      console.error('Error verifying token:', error);
      throw error;
    }
  }

  async listAllUsers(): Promise<any[]> {
    try {
      console.log('=== Starting listAllUsers ===');
      console.log('Firebase admin available?', !!admin);
      console.log('Firebase auth available?', !!admin.auth);
      console.log('Firebase app name:', admin.app().name);
      
      const users: any[] = [];
      let nextPageToken: string | undefined = undefined;
      
      console.log('About to call admin.auth().listUsers()...');
      
      do {
        console.log('Making listUsers call with token:', nextPageToken || 'none');
        const result = await admin.auth().listUsers(1000, nextPageToken);
        console.log('Got result, users count:', result.users.length);
        users.push(...result.users);
        nextPageToken = result.pageToken;
        console.log('Next page token:', nextPageToken || 'none');
      } while (nextPageToken);
      
      console.log('Total users processed:', users.length);
      
      const mappedUsers = users.map(user => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: user.customClaims?.role ?? null,
        createdAt: user.metadata.creationTime,
        lastSignIn: user.metadata.lastSignInTime
      }));
      
      console.log('Mapped users successfully');
      return mappedUsers;
      
    } catch (error) {
      console.error('=== ERROR in listAllUsers ===');
      console.error('Error type:', typeof error);
      console.error('Error:', error);
      console.error('Error message:', error?.message);
      console.error('Error code:', error?.code);
      console.error('Error stack:', error?.stack);
      
      // Re-throw with more context
      throw new Error(`Firebase listAllUsers failed: ${error?.message || 'Unknown error'}`);
    }
  }
}