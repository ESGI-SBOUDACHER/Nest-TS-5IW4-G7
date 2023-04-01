import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Version('1')
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body.email, body.password);
  }

  @Version('1')
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
