import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly logger = new NestLogger('Application');

  log(message: string, context?: string) {
    this.logger.log(message, context || 'Application');
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, trace, context || 'Application');
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context || 'Application');
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, context || 'Application');
  }

  info(message: string, context?: string) {
    this.logger.log(message, context || 'Application');
  }
}