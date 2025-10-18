import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import * as cors from 'cors';
//import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;
  console.log('CORS origin set to:', process.env.FRONTEND_URL);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    //origin: '*',
    methods: ['GET,POST,PUT,DELETE,OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(port, host);
  console.log(`API is running on http://${host || 'localhost'}:${port}`);
}

void bootstrap();
