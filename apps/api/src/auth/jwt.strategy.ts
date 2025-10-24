import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma.service';

dotenv.config();

type JwtPayload = {
  sub: string; // e.g. "auth0|abc123" or "google-oauth2|xyz"
  iss: string;
  aud: string | string[];
  scope?: string;
};

export interface JwtUser {
  userId: string;
  provider: string;
  providerId: string;
  sub: string;
  scopes: string[];
}

function splitSub(sub: string) {
  // "provider|id" → { provider, providerId }
  const [provider, ...rest] = sub.split('|');
  return { provider, providerId: rest.join('|') };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: [
        process.env.AUTH0_AUDIENCE,
        'http://localhost:3000',
      ],
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUser> {
    console.log('🔍 JWT DEBUG -----------------------------------');
    console.log('Issuer (iss):', payload.iss);
    console.log('Audience (aud):', payload.aud);
    console.log('Expected issuer:', process.env.AUTH0_ISSUER_URL);
    console.log('Expected audience:', process.env.AUTH0_AUDIENCE);
    console.log('-------------------------------------------------');

    const { sub } = payload;
    const { provider, providerId } = splitSub(sub);

    // 1) Find Authentication by provider+providerId
    let auth = await this.prisma.authentication.findFirst({
      where: { provider, providerId },
      include: { user: true },
    });

    // 2) If missing, create User + Authentication (using whatever claims we have)
    if (!auth) {
      const student = await this.prisma.student.create({
        data: {
          name: payload['name'] ?? 'Unnamed User',
          email: payload['email'],
        },
      });
      const user = await this.prisma.user.create({
        data: {
            email: payload['email'],
            name: payload['name'],
            student: { connect: { student_cuid: student.student_cuid} },
            authentications: {
              create: {
                provider,
                providerId,
              },
            }
        },
      });
      auth = { ...auth, user } as any;
    } else {
      // 3) Update user profile fields opportunistically (don’t overwrite with nulls)
      await this.prisma.user.update({
        where: { user_cuid: auth.user_cuid },
        data: {},
      });
    }

    return {
      userId: auth.user_cuid,
      provider,
      providerId,
      sub,
      scopes: (payload.scope ?? '').split(' ').filter(Boolean),
    } as JwtUser;
  }
}