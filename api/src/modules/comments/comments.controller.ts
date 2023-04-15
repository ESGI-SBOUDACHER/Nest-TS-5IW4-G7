import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Request,
  Header,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
  Patch,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '@api/modules/auth/auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentsDto, UpdateCommentsDto } from './comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  @Version('1')
  @HttpCode(200)
  getComments() {
    return this.commentService.getComments();
  }

  @Get('articles/:idArticle')
  @Version('1')
  @HttpCode(200)
  getCommentsByArticle(@Param('idArticle', ParseIntPipe) id: number) {
    return this.commentService.getCommentsByArticle({ where: { id: id }});
  }

  @Get(':id')
  @Version('1')
  @HttpCode(200)
  public getComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getComment({ where: { id: id } });
  }

  @Post()
  @Version('1')
  @HttpCode(201)
  public createComment(@Body() data: CreateCommentsDto) {
    return this.commentService.createComment({ data });
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(200)
  public deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteComment({ where: { id: id } });
  }

  @Patch(':id')
  @Version('1')
  @HttpCode(200)
  public updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCommentsDto,
  ) {
    return this.commentService.updateComment({ where: { id: id }, data });
  }

}
