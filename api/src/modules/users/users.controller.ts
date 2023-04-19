import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Patch,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { ZodValidationPipe } from 'nestjs-zod';
import { PasswordInterceptor } from './users.interceptor';
import { UsersDeleteDto, UsersGetDto, UsersUpdateDto } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseInterceptors(PasswordInterceptor)
  @Version('1')
  @Header('X-School', 'ESGI')
  public getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get('get')
  @UseInterceptors(PasswordInterceptor)
  @Version('1')
  public getUser(@Body(ZodValidationPipe) body: UsersGetDto): Promise<User> {
    return this.userService.getUser(body);
  }

  @Delete()
  @UseInterceptors(PasswordInterceptor)
  @Version('1')
  public deleteUser(
    @Body(ZodValidationPipe) body: UsersDeleteDto,
  ): Promise<User> {
    return this.userService.deleteUser(body);
  }

  @Patch()
  @Roles(Role.USER)
  @UseInterceptors(PasswordInterceptor)
  @Version('1')
  public updateUser(
    @Body(ZodValidationPipe) body: UsersUpdateDto,
  ): Promise<User | typeof UnauthorizedException> {
    return this.userService.updateUser(body);
  }

  @Get('currentUser')
  @Roles(Role.USER)
  @UseInterceptors(PasswordInterceptor)
  @Version('1')
  public getCurrentUser(
    @Request() req: Request,
  ): Promise<User | typeof UnauthorizedException> {
    const user = new UsersGetDto();
    user.email = req['user'].email;
    return this.userService.getUser(user);
  }
}
