import * as dotenv from 'dotenv';
import * as path from 'path';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '../.env') });
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // More explicit CORS configuration
  app.enableCors({
    origin: [
      'https://buddybridge.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL
    ].filter(Boolean), // Remove any undefined values
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept',
      'Origin',
      'X-Requested-With'
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port ${port}`);
  console.log(`CORS enabled for: https://buddybridge.vercel.app, ${process.env.FRONTEND_URL}`);
}
bootstrap();
