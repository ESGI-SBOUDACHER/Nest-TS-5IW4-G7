import { Inject, Injectable, Scope } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { Article, Comment } from '@prisma/client';
import { ArticlesRepository } from '@api/modules/articles/articles.repository';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class CommentsService {
    constructor(
        private readonly commentRepository: CommentsRepository,
        private readonly articleRepository: ArticlesRepository,
        @Inject(REQUEST) private readonly request: any, // A voir pour request sans le any
    ) { }

    async getComments() {
        const comments = await this.commentRepository.getComments({});
        return comments;
    }

    async getCommentsByArticle(params: {  idArticle?: Article['id'] } ) {
        const { idArticle } = params;
        const article = await this.articleRepository.getArticle({
            where: { id : idArticle },
        });
        if (article.isPublished) {
        const comments = await this.commentRepository.getCommentsByArticle({ articleId: idArticle });
        return comments;
        } else {
            return 'Article not published';
        }
    }

    async getComment(params: { id?: Comment['id']  }) {
        const { id } = params;
        const comment = await this.commentRepository.getComment({ where : { id }});
        return comment;
    }

    async createComment(params: { content?: Comment['content'], authorId?: Comment['authorId'], articleId?: Comment['articleId'] }) {
        const { content, authorId, articleId } = params;
        const article = await this.articleRepository.getArticle({
            where: { id: articleId },
        });
        if (article.isPublished) {
            if (authorId) {
                if (this.request.user.role == 'USER') {
                    return 'You are magicien';
                }
            }
            const comment = await this.commentRepository.createComment({
                data: {
                    content,
                    author: {
                        connect: {
                            id: authorId ? authorId : this.request.user.id,
                        },
                    },
                    article: {
                        connect: {
                            id: articleId,
                        },
                    },
                },
            });
            return comment;
        } else {
            return 'Article not published';
        }
    }

    async deleteComment(params: {  id?: Comment['id']  }) {
        // Voir pour le any
        const { id } = params;
        const commentActu = await this.commentRepository.getComment({ where : { id }});
        if (
            commentActu?.authorId === this.request.user.id ||
            this.request.user.role == 'ADMIN'
        ) {
            const comment = await this.commentRepository.deleteComment({ where : { id } });
            return comment;
        } else {
            return 'You are not the author of this comment';
        }
    }

    async updateComment(params: { id?: Comment['id'] , content?: Comment['content'], authorId?: Comment['authorId'], articleId?: Comment['articleId'] }) {
        const { id, content, authorId, articleId } = params;
        const commentActu = await this.commentRepository.getComment({ where : { id }});
        if (
            commentActu?.authorId === this.request.user.id ||
            this.request.user.role == 'ADMIN'
        ) {
            const comment = await this.commentRepository.updateComment({
                where: { id },
                data: {
                    content,
                    author: {
                        connect: {
                            id: authorId ? authorId : this.request.user.id,
                        },
                    },
                    article: {
                        connect: {
                            id: articleId,
                        },
                    },
                },
            });
            return comment;
        } else {
            return 'You are not the author of this comment';
        }
    }

}
