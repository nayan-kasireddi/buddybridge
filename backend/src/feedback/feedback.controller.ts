
import { Controller, Post, Get, Body, Param, Req, UnauthorizedException } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import * as admin from 'firebase-admin';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async createFeedback(@Body() feedbackDto: any, @Req() req: any) {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) throw new UnauthorizedException('No token provided');

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      if (decodedToken.uid !== feedbackDto.fromUserId) {
        throw new UnauthorizedException('UID mismatch');
      }
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return this.feedbackService.createFeedback(feedbackDto);
  }

  @Get('user/:userId')
  async getFeedbackByUser(@Param('userId') userId: string, @Req() req: any) {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) throw new UnauthorizedException('No token provided');

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      if (decodedToken.uid !== userId) {
        throw new UnauthorizedException('UID mismatch');
      }
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return this.feedbackService.getFeedbackByUserId(userId);
  }

  @Get('all')
  async getAllFeedback(@Req() req: any) {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) throw new UnauthorizedException('No token provided');

    try {
      await admin.auth().verifyIdToken(idToken);
      // Note: In a real app, you'd check if user is admin here
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return this.feedbackService.getAllFeedback();
  }

  @Get('stats')
  async getFeedbackStats(@Req() req: any) {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) throw new UnauthorizedException('No token provided');

    try {
      await admin.auth().verifyIdToken(idToken);
      // Note: In a real app, you'd check if user is admin here
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return this.feedbackService.getFeedbackStats();
  }
}
