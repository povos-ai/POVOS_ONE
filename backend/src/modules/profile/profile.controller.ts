import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async getProfile(@Request() req) {
    const user = await this.profileService.getProfile(req.user.userId);
    const completion = this.profileService.calculateCompletion(user);
    return { ...user, completion };
  }

  @Patch()
  async updateProfile(@Request() req, @Body() data: any) {
    const updated = await this.profileService.updateProfile(req.user.userId, data);
    const completion = this.profileService.calculateCompletion(updated);
    return { ...updated, completion };
  }

  @Get('completion')
  async getCompletion(@Request() req) {
    const user = await this.profileService.getProfile(req.user.userId);
    return { completion: this.profileService.calculateCompletion(user) };
  }
}
