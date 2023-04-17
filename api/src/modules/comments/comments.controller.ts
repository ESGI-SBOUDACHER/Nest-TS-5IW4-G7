import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CommentsCreateDto,
  CommentsDeleteDto,
  CommentsGetByArticleDto,
  CommentsGetDto,
  CommentsUpdateDto,
} from '../comments/comments.schema';
import { CommentsService } from './comments.service';

@Controller('comments')
@Roles(Role.USER)
@UseGuards(RolesGuard)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @Version('1')
  getComments() {
    return this.commentService.getComments();
  }

  @Get('articles')
  @Version('1')
  getCommentsByArticle(@Body(ZodValidationPipe) data: CommentsGetByArticleDto) {
    return this.commentService.getCommentsByArticle(data);
  }

  @Get('get')
  @Version('1')
  public getComment(@Body(ZodValidationPipe) data: CommentsGetDto) {
    return this.commentService.getComment(data);
  }

  @Post('add')
  @Version('1')
  public createComment(@Body(ZodValidationPipe) body: CommentsCreateDto) {
    return this.commentService.createComment(body);
  }

  @Delete('delete')
  @Version('1')
  public deleteComment(@Body(ZodValidationPipe) body: CommentsDeleteDto) {
    return this.commentService.deleteComment(body);
  }

  @Patch('update')
  @Version('1')
  public updateComment(@Body(ZodValidationPipe) data: CommentsUpdateDto) {
    return this.commentService.updateComment(data);
  }
}
