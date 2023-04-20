import { Injectable } from '@nestjs/common';
import { Like, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LikesRepository {
  constructor(private prisma: PrismaService) {}

  async createLike(params: { data: Prisma.LikeCreateInput }): Promise<Like> {
    const { data } = params;
    return this.prisma.like.create({ data });
  }

  async getLikes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LikeWhereUniqueInput;
    where?: Prisma.LikeWhereInput;
    orderBy?: Prisma.LikeOrderByWithRelationInput;
  }): Promise<Like[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.like.findMany({ skip, take, cursor, where, orderBy });
  }

  async getLike(params: { where: Prisma.LikeWhereUniqueInput }): Promise<Like> {
    const { where } = params;
    return this.prisma.like.findUnique({ where });
  }

  async getOneLike(params: { where: Prisma.LikeWhereInput }): Promise<Like> {
    const { where } = params;
    return this.prisma.like.findFirst({ where });
  }

  async deleteLike(params: {
    where: Prisma.LikeWhereUniqueInput;
  }): Promise<Like> {
    const { where } = params;
    return this.prisma.like.delete({ where });
  }
}
