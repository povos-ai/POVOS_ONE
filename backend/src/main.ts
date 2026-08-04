import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import { WinstonLoggerService } from './logger/winston-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Use Winston Logger
  const logger = app.get(WinstonLoggerService);
  app.useLogger(logger);

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('POVOS ONE API')
    .setDescription('AI Powered Opportunity Intelligence Platform')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Start server
  const port = process.env.PORT || 3001;
  await app.listen(port);

  logger.log(`🚀 Server running on http://localhost:${port}`);
  logger.log(`📘 Swagger docs on http://localhost:${port}/docs`);
}

bootstrap();