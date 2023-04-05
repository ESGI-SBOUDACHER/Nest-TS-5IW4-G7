import { Controller, Get, Version } from '@nestjs/common';
import { UsersService } from './users.service';

// @Roles(Role.ADMIN)
// @UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Version('1')
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}
