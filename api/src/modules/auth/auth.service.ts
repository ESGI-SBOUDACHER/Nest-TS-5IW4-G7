import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  // TODO : Use bcrypt here
  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.getUser({ where: { email } });
    if (user && user.password === password) {
      const { password, ...result } = user;
      // TODO : return JWT token instead
      return result;
    }
    return UnauthorizedException;
  }
}
