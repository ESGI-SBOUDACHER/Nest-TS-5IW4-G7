import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Like, Role } from '@prisma/client';
import { LikesCreateDto, LikesDeleteDto } from './likes.schema';
import { LikesService } from './likes.service';

@Controller('likes')
@Roles(Role.USER)
@UseGuards(RolesGuard)
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

  // createLike
  @Post('')
  @Version('1')
  public createLike(data: LikesCreateDto): Promise<Like> {
    return this.likesService.createLike(data);
  }

  // delete like

  @Delete('')
  @Version('1')
  public deleteLike(data: LikesDeleteDto): Promise<Like> {
    return this.likesService.deleteLike(data);
  }
}
