import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  createUser(
    @Body()
    data: {
      email: string;
      firstname: string;
      lastname: string;
      password: string;
    },
  ) {
    return this.userService.createUser(data);
  }
}
