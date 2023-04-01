import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private repository: CategoriesRepository) {}

  async createCategory(params: { name: Category['name'] }) {
    const { name } = params;

    const category = await this.repository.createCategory({
      data: {
        name,
      },
    });

    return category;
  }

  //   async getCategories() {
  //     const categories = await this.repository.getCategories({});
  //     return categories;
  //   }

  async getCategory(params: { where: { name: Category['name'] } }) {
    const { where } = params;
    const category = await this.repository.getCategory({ where });
    return category;
  }

  //   async updateCategory(params: {
  //     where: { name: Category['name'] };
  //     data: { name: Category['name'] };
  //   }) {
  //     const { where, data } = params;
  //     const category = await this.repository.updateCategory({
  //       where,
  //       data,
  //     });
  //     return category;
  //   }
}
