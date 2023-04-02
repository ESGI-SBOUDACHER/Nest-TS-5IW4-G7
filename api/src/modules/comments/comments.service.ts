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

    async getComment(params: { where: { id: Comment['id'] } }) {
        const { where } = params;
        const comment = await this.commentRepository.getComment({ where });
        return comment;
    }

}