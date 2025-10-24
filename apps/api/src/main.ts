import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
//import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;

  console.log('CORS origin set to:', process.env.FRONTEND_URL);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  });

  app.use((req, res, next) => {
  if (req.headers.authorization) {
    console.log('🪶 Incoming Authorization Header:', req.headers.authorization);
      try {
        const [, token] = req.headers.authorization.split(' ');
        const payload = JSON.parse(
          Buffer.from(token.split('.')[1], 'base64').toString('utf-8')
        );
        console.log('🔍 Decoded JWT Payload:', payload);
      } catch (e) {
        console.error('❌ Could not decode JWT:', e instanceof Error ? e.message : e);
      }
    } else {
      console.log('⚠️ No Authorization header found on request:', req.method, req.path);
    }
    next();
  });

  await app.listen(port, host);
  console.log(`API is running on http://${host || 'localhost'}:${port}`);
}

void bootstrap();
