import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const idToken = authHeader.split('Bearer ')[1].trim();

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      request.user = decodedToken;
      return true;
    } catch (error) {
      console.error('Firebase Auth Error:', error);
      throw new UnauthorizedException('Invalid or expired Firebase ID token');
    }
  }
}
