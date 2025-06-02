import { Injectable } from '@nestjs/common';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';

@Injectable()
export class UserService {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {}

  async assignRole(uid: string, role: string) {
    const validRoles = ['urban_kid', 'rural_kid', 'mentor', 'admin'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role');
    }
    return this.firebaseAuthService.setUserRole(uid, role);
  }

  async getRole(uid: string) {
    return this.firebaseAuthService.getUserRole(uid);
  }
}

