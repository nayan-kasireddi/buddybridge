import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
// In production, environment variables should be set via Render's dashboard
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '../.env') });
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS - merged both variants:
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'https://buddybridge.vercel.app' || 'http://localhost:5173',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on port ${port}`);
}
bootstrap();
