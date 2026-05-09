import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header = request.headers['x-api-key'];
    const expected = process.env.PIM_API_KEY;

    if (!expected) {
      return true;
    }

    if (header !== expected) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
