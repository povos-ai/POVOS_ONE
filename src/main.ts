import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as compression from 'compression';

async function bootstrap() {
  // ============================================
  // 1. Winston Logger Configuration
  // ============================================
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // Console Transport (Development)
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, context }) => {
              return `${timestamp} [${context || 'Application'}] ${level}: ${message}`;
            }),
          ),
        }),
        // File Transport - Error Logs
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.json(),
        }),
        // File Transport - Combined Logs
        new winston.transports.File({
          filename: 'logs/combined.log',
          format: winston.format.json(),
        }),
      ],
    }),
  });

  // ============================================
  // 2. Security & Middleware
  // ============================================
  // Helmet - Security Headers
  app.use(helmet());

  // CORS - Cross-Origin Resource Sharing
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Compression - Gzip Response Compression
  app.use(compression());

  // ============================================
  // 3. Global Pipes - Validation
  // ============================================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ============================================
  // 4. Swagger API Documentation
  // ============================================
  const config = new DocumentBuilder()
    .setTitle('<PovosText className="text-2xl" /> API')
    .setDescription('AI-Powered Opportunity Intelligence Platform')
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
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('workspaces', 'Workspace management')
    .addTag('opportunities', 'Opportunity management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // ============================================
  // 5. Port Binding (Production Ready)
  // ============================================
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  // ============================================
  // 6. Startup Log
  // ============================================
  console.log(`🚀 <PovosText className="text-2xl" /> API is running on: http://localhost:${port}`);
  console.log(`📚 Swagger UI: http://localhost:${port}/api-docs`);
  console.log(`🔗 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();