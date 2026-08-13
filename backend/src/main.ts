import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  if (!process.env.JWT_SECRET) {
    console.error('❌ JWT_SECRET environment variable is required.');
    process.exit(1);
  }
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });
  
  app.useGlobalFilters(new AllExceptionsFilter());
  
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  
  console.log(`Server running on http://localhost:${port}`);
}

bootstrap();

