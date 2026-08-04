import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ) {
    console.log('========== JWT GUARD ==========');
    console.log('ERR:', err);
    console.log('user:', user);
    console.log('INFO:', info);
    console.log('===============================');

    if (err || !user) {
      throw err || new UnauthorizedException(info?.message ?? 'Unauthorized');
    }

    return user;
  }
}