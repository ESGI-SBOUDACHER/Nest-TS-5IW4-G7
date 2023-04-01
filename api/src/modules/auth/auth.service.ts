import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ where: { email } });

    if (!user) {
      return UnauthorizedException;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return UnauthorizedException;
    }

    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ where: { email } });
    if (user) {
      return UnauthorizedException;
    }

    const newUser = await this.userService.createUser({ email, password });
    const payload = {
      email: newUser.email,
      id: newUser.id,
      role: newUser.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
