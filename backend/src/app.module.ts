// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FirebaseAuthService } from './firebase/firebase-auth.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User } from './entity/User';
import { SessionController } from './session/session.controller';
import { SessionService } from './session/session.service';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';
import { MatchmakingController } from './matchmaking/matchmaking.controller';
import { MatchmakingService } from './matchmaking/matchmaking.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [FirebaseAuthService, UserService, SessionService, FeedbackService, MatchmakingService],
  controllers: [UserController, SessionController, FeedbackController, MatchmakingController],
})
export class AppModule {}
