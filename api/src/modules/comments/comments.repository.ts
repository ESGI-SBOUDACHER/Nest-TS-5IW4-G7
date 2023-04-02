import { Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class CommentsRepository {
  constructor(private prisma: PrismaService) {}

    //ADMIN SECTION
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

    async getComment(params: {
      where: Prisma.CommentWhereUniqueInput;
    }): Promise<Comment> {
      const { where } = params;
      return this.prisma.comment.findUnique({ where });
    }

}