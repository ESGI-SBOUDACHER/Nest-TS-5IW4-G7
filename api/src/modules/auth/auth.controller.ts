import { Public } from '@api/common/decorators/public.decorator';
import { Body, Controller, Post, Version,UseInterceptors, InternalServerErrorException } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthLoginDto, AuthRegisterDto } from './auth.schema';
import { AuthService } from './auth.service';
import { SentryInterceptor } from '@api/sentry.interceptor';
@Controller('auth')
@UseInterceptors(SentryInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Version('1')
  @Post('login')
  login(@Body(ZodValidationPipe) body: AuthLoginDto) {
      return this.authService.login(body);
  }

  @Public()
  @Version('1')
  @Post('register')
  register(@Body(ZodValidationPipe) body: AuthRegisterDto) {
    return this.authService.register(body);
  }
}
