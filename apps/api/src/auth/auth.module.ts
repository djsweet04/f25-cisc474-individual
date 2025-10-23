import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [PassportModule, PrismaService],
})
export class AuthModule {}
