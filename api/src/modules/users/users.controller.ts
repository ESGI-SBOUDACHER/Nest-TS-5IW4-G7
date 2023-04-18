import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { ZodValidationPipe } from 'nestjs-zod';
import { UsersDeleteDto, UsersGetDto, UsersUpdateDto } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Version('1')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('get')
  @Version('1')
  getUser(@Body(ZodValidationPipe) body: UsersGetDto) {
    return this.userService.getUser(body);
  }

  @Delete()
  @Version('1')
  deleteUser(@Body(ZodValidationPipe) body: UsersDeleteDto) {
    return this.userService.deleteUser(body);
  }

  @Patch()
  @Roles(Role.USER)
  @Version('1')
  updateUser(@Body(ZodValidationPipe) body: UsersUpdateDto) {
    return this.userService.updateUser(body);
  }

  @Get('currentUser')
  @Roles(Role.USER)
  @Version('1')
  getCurrentUser(@Request() req: Request) {
    const user = new UsersGetDto();
    user.email = req['user'].email;
    return this.userService.getUser(user);
  }
}
