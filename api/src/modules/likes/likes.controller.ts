import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Version,
  UseInterceptors,
} from '@nestjs/common';
import { Like, Role } from '@prisma/client';
import { ZodValidationPipe } from 'nestjs-zod';
import { LikesCreateDto, LikesDeleteDto } from './likes.schema';
import { LikesService } from './likes.service';
import { SentryInterceptor } from '@api/sentry.interceptor';

@Controller('likes')
@Roles(Role.USER)
@UseGuards(RolesGuard)
@UseInterceptors(SentryInterceptor)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  @Version('1')
  public getLikes(): Promise<Like[]> {
    return this.likesService.getLikes();
  }

  @Get(':id')
  @Version('1')
  public getLike(@Param('id', ParseIntPipe) id: number): Promise<Like> {
    return this.likesService.getLike({ id });
  }

  @Post('')
  @Version('1')
  public createLike(
    @Body(ZodValidationPipe) data: LikesCreateDto,
  ): Promise<Like | Error> {
    return this.likesService.createLike(data);
  }

  @Delete('')
  @Version('1')
  public deleteLike(
    @Body(ZodValidationPipe) data: LikesDeleteDto,
  ): Promise<Like | Error> {
    return this.likesService.deleteLike(data);
  }
}
