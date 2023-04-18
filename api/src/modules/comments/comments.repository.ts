import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CommentsRepository {
  constructor(private prisma: PrismaService) {}

  async getComments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.comment.findMany({ skip, take, cursor, where, orderBy });
  }

  async getCommentsByArticle(params: {
    articleId: number;
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }): Promise<Comment[]> {
    const { articleId, skip, take, cursor, where, orderBy } = params;
    return this.prisma.comment.findMany({
      skip,
      take,
      cursor,
      where: {
        articleId,
      },
      orderBy,
    });
  }

  async getComment(params: {
    where: Prisma.CommentWhereUniqueInput;
  }): Promise<Comment> {
    const { where } = params;
    return this.prisma.comment.findUnique({ where });
  }

  async createComment(params: {
    data: Prisma.CommentCreateInput;
  }): Promise<Comment> {
    const { data } = params;
    return this.prisma.comment.create({ data });
  }

  async deleteComment(params: {
    where: Prisma.CommentWhereUniqueInput;
  }): Promise<Comment> {
    const { where } = params;
    return this.prisma.comment.delete({ where });
  }

  async updateComment(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }): Promise<Comment> {
    const { where, data } = params;
    return this.prisma.comment.update({ where, data });
  }
}
