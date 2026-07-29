import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    console.log(
      '================ JWT DEBUG ================',
    );
    console.log(
      'JWT_SECRET:',
      config.get<string>('JWT_SECRET'),
    );
    console.log(
      'JWT_EXPIRES_IN:',
      config.get<string>('JWT_EXPIRES_IN'),
    );
    console.log(
      '===========================================',
    );

    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: config.getOrThrow<string>(
        'JWT_SECRET',
      ),
    });
  }

  async validate(payload: any) {
    console.log(
      '=========== JWT PAYLOAD ===========',
    );
    console.log(payload);
    console.log(
      '===================================',
    );

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}