import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import * as admin from 'firebase-admin';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createOrUpdateProfile(@Body() profileDto: any, @Req() req: any) {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) throw new UnauthorizedException('No token provided');

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
