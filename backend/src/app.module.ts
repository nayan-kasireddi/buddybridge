// src/app.module.ts
import { Module } from '@nestjs/common';  // <- import this
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FirebaseAuthService } from './firebase/firebase-auth.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User } from './entity/User';

import { SessionController } from './session/session.controller';
import { SessionService } from './session/session.service';

import { FeedbackModule } from './feedback/feedback.module';

import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';

// Remove matchmaking references if folder/module missing

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
    FeedbackModule,
  ],
  controllers: [
    AppController,
    UserController,
    SessionController,
    ProfileController,
  ],
  providers: [
    AppService,
    FirebaseAuthService,
    UserService,
    SessionService,
    ProfileService,
  ],
})
export class AppModule {}
