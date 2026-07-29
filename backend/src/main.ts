import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('POVOS ONE API')
    .setDescription('AI Powered Opportunity Intelligence Platform')
    .setVersion('1.0.0')

    // ===========================
    // JWT Authentication
    // ===========================
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Paste JWT Token here',
      },
      'JWT-auth',
    )

    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3001);

  console.log(
    '✅ POVOS Backend running at http://localhost:3001',
  );
  console.log(
    '📘 Swagger Docs: http://localhost:3001/docs',
  );
}

bootstrap();