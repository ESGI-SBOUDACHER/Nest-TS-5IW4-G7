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
import { ZodValidationPipe } from 'nestjs-zod';
import { UsersDeleteDto, UsersGetDto } from './users.schamea';
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

  @Post('delete')
  @Version('1')
  deleteUser(@Body(ZodValidationPipe) body: UsersDeleteDto) {
    return this.userService.deleteUser(body);
  }
}
