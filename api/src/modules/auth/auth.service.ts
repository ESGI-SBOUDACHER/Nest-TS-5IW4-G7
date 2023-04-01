import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // TODO : Use bcrypt here
  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ where: { email } });
    if (user && user.password === password) {
      const payload = { email: user.email, id: user.id, role: user.role };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    }

    return UnauthorizedException;
  }
}
