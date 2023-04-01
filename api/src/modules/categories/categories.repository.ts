import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async createCategory(params: {
    data: Prisma.CategoryCreateInput;
  }): Promise<Category> {
    const { data } = params;
    return this.prisma.category.create({ data });
  }

  async getCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
  }): Promise<Category> {
    const { where } = params;
    return this.prisma.category.findUnique({ where });
  }

  async getCategories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async deleteCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
  }): Promise<Category> {
    const { where } = params;
    return this.prisma.category.delete({ where });
  }
}
