import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createOrUpdateProfile(@Body() profileDto: any, @Req() req: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const idToken = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      if (decodedToken.uid !== profileDto.uid) {
        throw new UnauthorizedException('UID mismatch');
      }
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return this.profileService.upsertProfile(profileDto);
  }
}
