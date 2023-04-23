import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Like, PrismaClient, Role } from '@prisma/client';
import { LikesRepository } from './likes.repository';
import { LikesCreateDto, LikesGetDto } from './likes.schema';

@Injectable()
export class LikesService {
  constructor(
    private repository: LikesRepository,
    @Inject(REQUEST) private readonly request: any, // A voir pour request sans le any
  ) {}

  async getLikes(): Promise<Like[]> {
    let likes: Like[] = [];
    if (this.request.user.roles.includes(Role.ADMIN))
      likes = await this.repository.getLikes({});
    else
      likes = await this.repository.getLikes({
        where: { authorId: this.request.user.id },
      });
    return likes;
  }

  async getLike(params: LikesGetDto): Promise<Like> {
    const prisma = new PrismaClient();
    const { id } = params;
    let like: Like = null;

    if (this.request.user.roles.includes(Role.ADMIN))
      like = await this.repository.getLike({
        where: { id },
      });
    else
      like = await prisma.like.findFirst({
        where: { id, authorId: this.request.user.id },
      });

    return like;
  }

  async createLike(params: LikesCreateDto): Promise<Like | Error> {
    const { articleId } = params;

    // We check if the user has already liked the article
    const likeExists = await this.repository.getOneLike({
      where: { articleId, authorId: this.request.user.id },
    });

    // We check if the article exists and if it is published
    const article = new PrismaClient().article.findFirst({
      where: { id: articleId, isPublished: true },
    });

    if (!article) throw new UnauthorizedException();
    if (likeExists) throw new Error('You already liked this article');

    const like = await this.repository.createLike({
      data: {
        author: {
          connect: {
            id: this.request.user.id,
          },
        },
        article: {
          connect: {
            id: articleId,
          },
        },
      },
    });
    return like;
  }

  async deleteLike(params: LikesGetDto): Promise<Like | Error> {
    const { id } = params;

    let like: Like = null;

    like = await this.repository.getLike({
      where: { id },
    });

    // checked if the user is the author of the like
    if (like.authorId != this.request.user.id)
      throw new UnauthorizedException();

    like = await this.repository.deleteLike({
      where: { id },
    });

    return like;
  }
}
