import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
//import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;

  app.enableCors({
    origin: process.env.FRONTENT_URL,
    methods: 'GET,POST,PUT,DELETE',
  });
  await app.listen(port, host);
}

void bootstrap();
