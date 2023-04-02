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

    async createComment(params: { data: CreateCommentsDto  }) {
        const { content, authorId,  articleId} = params.data;
        const comment = await this.commentRepository.createComment({
            data: {
                content,
                author:{
                    connect:{
                        id: authorId
                    },
                },
                article:{
                    connect:{
                        id: articleId
                    },
                },
            },
        });
        return comment;
    }

    async deleteComment(params: { where: { id: Comment['id'] } }) {
        const { where } = params;
        const comment = await this.commentRepository.deleteComment({ where });
        return comment;
    }

    async updateComment(params: { where: { id: Comment['id'] }; data: UpdateCommentsDto }) {
        const { where } = params;
        const { content, authorId,  articleId} = params.data;
        const comment = await this.commentRepository.updateComment({
            where,
            data: {
                content,
                author: {
                    connect: {
                        id: authorId
                    },
                },
                article: {
                    connect: {
                        id: articleId
                    },
                },
            },
        });
        return comment;
    }

    //END ADMIN SECTION
}