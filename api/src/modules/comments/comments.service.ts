import { Inject, Injectable, Scope } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentsDto, UpdateCommentsDto } from './comments.dto';
import { Comment } from '@prisma/client';
import { ArticlesRepository } from '@api/modules/articles/articles.repository';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentsRepository,
    private readonly articleRepository: ArticlesRepository,
    @Inject(REQUEST) private readonly request: any, // A voir pour request sans le any
  ) {}

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

  async createComment(params: { data: CreateCommentsDto }) {
    const { content, authorId, articleId } = params.data;
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

  async deleteComment(params: { where: { id: Comment['id'] } }) {
    // Voir pour le any
    const { where } = params;
    const commentActu = await this.commentRepository.getComment({ where });
    if (
      commentActu?.authorId === this.request.user.id ||
      this.request.user.role == 'ADMIN'
    ) {
      const comment = await this.commentRepository.deleteComment({ where });
      return comment;
    } else {
      return 'You are not the author of this comment';
    }
  }

  async updateComment(params: {
    where: { id: Comment['id'] };
    data: UpdateCommentsDto;
  }) {
    const { where } = params;
    const { content, authorId, articleId } = params.data;
    const comment = await this.commentRepository.updateComment({
      where,
      data: {
        content,
        author: {
          connect: {
            id: authorId,
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
  }

  //END ADMIN SECTION
}
