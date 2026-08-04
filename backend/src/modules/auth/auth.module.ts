import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';
import { PrismaModule } from '../../database/prisma.module';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.getOrThrow<string>('JWT_EXPIRES_IN') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailService,
    JwtStrategy,
  ],
  exports: [JwtModule, PassportModule, AuthService, EmailService],
})
export class AuthModule {}