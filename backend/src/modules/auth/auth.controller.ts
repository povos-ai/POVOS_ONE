import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user and get JWT token' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get logged in user profile' })
  getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.id);
  }

  // ===== EMAIL VERIFICATION =====

  @Post('send-verification')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Send email verification' })
  sendVerificationEmail(@Request() req: any) {
    return this.authService.sendVerificationEmail(req.user.id);
  }

  @Get('verify-email')
  @ApiOperation({ summary: 'Verify email with token' })
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  // ===== FORGOT PASSWORD =====

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send password reset email' })
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
}