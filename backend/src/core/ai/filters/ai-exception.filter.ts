import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { AiException } from '../exceptions/ai.exception';

@Catch(AiException)
export class AiExceptionFilter implements ExceptionFilter {
  catch(exception: AiException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(exception.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: exception.statusCode,
      error: exception.error,
      message: exception.message,
      provider: exception.provider,
      timestamp: new Date().toISOString(),
    });
  }
}