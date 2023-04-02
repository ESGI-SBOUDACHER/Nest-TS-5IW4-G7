import {
    Body,
    Controller,
    Get,
    Post,
    HttpCode,
    Header,
    Param,
    ParseIntPipe,
    Delete,
    Patch,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto, UpdateCommentsDto } from './comments.dto';

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentService: CommentsService) {}

    //ADMIN SECTION
    @Get()
    @HttpCode(200)
    getComments() {
        return this.commentService.getComments();
    }

    @Get(':id')
    @HttpCode(200)
    public getComment(@Param('id', ParseIntPipe) id: number) {
        return this.commentService.getComment({ where: { id: id } });
    }
   
    @Post()
    @HttpCode(201)
    public createComment(@Body() data: CreateCommentsDto) {
        return this.commentService.createComment({ data });
    }

    @Delete(':id')
    @HttpCode(200)
    public deleteComment(@Param('id', ParseIntPipe) id: number) {
        return this.commentService.deleteComment({ where: { id: id } });
    }

}