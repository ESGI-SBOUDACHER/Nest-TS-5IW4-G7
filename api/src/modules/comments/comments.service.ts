import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentsDto, UpdateCommentsDto } from './comments.dto';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
    
    constructor(private readonly commentRepository: CommentsRepository) {}

    //ADMIN SECTION
    async getComments() {
        const comments = await this.commentRepository.getComments({});
        return comments;
    }


}