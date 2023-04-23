import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthLoginDto, AuthRegisterDto } from './auth.schema';
import * as Sentry from '@sentry/node';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(params: AuthLoginDto): Promise<any> {
    const { email, password } = params;
    const user = await this.userService.getUser({ email });

    if (!user) {
      return UnauthorizedException;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return UnauthorizedException;
    }

    const payload = { email: user.email, id: user.id, roles: user.roles };

    Sentry.setUser({ email: user.email });
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(params: AuthRegisterDto): Promise<any> {
    const { email, password } = params;
    const user = await this.userService.getUser({ email });
    if (user) {
      return UnauthorizedException;
    }

    const newUser = await this.userService.createUser({ email, password });
    const { password: newPassword, ...userData } = newUser;

    return userData;
  }
}
