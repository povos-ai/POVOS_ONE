import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ai/health')
  getHealth() {
    return { status: 'ok', message: 'AI services are healthy' };
  }

  @Get()
  getHello() {
    return { message: 'POVOS ONE API is running' };
  }
}