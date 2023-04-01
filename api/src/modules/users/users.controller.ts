import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Version('1')
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Version('1')
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
