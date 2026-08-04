import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
              return `[${timestamp}] ${level} [${context || 'Application'}]: ${message} ${
                Object.keys(meta).length ? JSON.stringify(meta) : ''
              }`;
            }),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/application.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    });
  }

  log(message: string, context?: string, ...meta: any[]) {
    this.logger.info(message, { context, meta });
  }

  error(message: string, trace?: string, context?: string, ...meta: any[]) {
    this.logger.error(message, { trace, context, meta });
  }

  warn(message: string, context?: string, ...meta: any[]) {
    this.logger.warn(message, { context, meta });
  }

  debug(message: string, context?: string, ...meta: any[]) {
    this.logger.debug(message, { context, meta });
  }

  verbose(message: string, context?: string, ...meta: any[]) {
    this.logger.verbose(message, { context, meta });
  }

  info(message: string, context?: string, meta?: any) {
    this.logger.info(message, { context, ...meta });
  }

  http(message: string, context?: string, meta?: any) {
    this.logger.http(message, { context, ...meta });
  }
}