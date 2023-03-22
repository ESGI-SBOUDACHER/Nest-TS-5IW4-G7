import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from '../models/interfaces/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Header('X-School', 'ESGI')
  findAll(@Res({ passthrough: true }) res: Response): Response {
    const users = this.userService.findAll();
    return res.status(200).send(users);
  }

  @Get(':id')
  @Header('X-School', 'ESGI')
  findOne(@Param() param, @Res({ passthrough: true }) res: Response): Response {
    const user = this.userService.find(param.id);
    if (user) {
      return res.status(200).send(user);
    }
    return res.status(404).send(`User#${param.id} not found`);
  }

  @Post()
  @Header('X-School', 'ESGI')
  createOne(
    @Body() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Response {
    this.userService.create(user);
    return res.status(200).send(user);
  }

  @Patch(':id')
  @Header('X-School', 'ESGI')
  updateOne(
    @Param() param,
    @Body() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Response {
    this.userService.update(param.id, user);
    return res.status(200).send(user);
  }

  @Delete(':id')
  @Header('X-School', 'ESGI')
  deleteOne(
    @Param() param,
    @Res({ passthrough: true }) res: Response,
  ): Response {
    this.userService.delete(param.id);
    return res.status(200).send(`deleteUser#${param.id}`);
  }
}
