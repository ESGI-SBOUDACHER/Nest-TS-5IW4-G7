import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { UsersService } from './users.service';

@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Version('1')
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Version('1')
  @Post('delete')
  deleteUser(@Body() body: { id: number }) {
    return this.userService.deleteUser(body);
  }
}
