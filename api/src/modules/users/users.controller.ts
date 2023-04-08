import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
import { Controller, Get, UseGuards, Version } from '@nestjs/common';
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
}
