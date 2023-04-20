import { Inject, Injectable } from '@nestjs/common';
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

  async createLike(params: LikesCreateDto): Promise<Like> {
    const { articleId } = params;

    // We check if the user has already liked the article
    const likeExists = await this.repository.getOneLike({
      where: { articleId, authorId: this.request.user.id },
    });

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

  async deleteLike(params: LikesGetDto): Promise<Like> {
    const { id } = params;

    let like: Like = null;

    // If the user is not an admin, we check if he is the author of the like
    if (!this.request.user.roles.includes(Role.ADMIN)) {
      like = await this.repository.getLike({
        where: { id },
      });

      if (like.authorId != this.request.user.id)
        throw new Error("You can't delete this like");
    }

    like = await this.repository.deleteLike({
      where: { id },
    });

    return like;
  }
}
