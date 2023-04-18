import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import {
  CategoriesCreateDto,
  CategoriesDeleteDto,
  CategoriesGetDto,
  CategoriesUpdateDto,
} from './categories.schema';

@Injectable()
export class CategoriesService {
  constructor(private repository: CategoriesRepository) {}

  async createCategory(params: CategoriesCreateDto) {
    const { name } = params;

    const category = await this.repository.createCategory({
      data: {
        name,
      },
    });

    return category;
  }

  async getCategory(params: CategoriesGetDto) {
    const { id } = params;
    const category = await this.repository.getCategory({
      where: { id },
    });
    return category;
  }

  async getCategories() {
    const categories = await this.repository.getCategories({});
    return categories;
  }

  async deleteCategory(params: CategoriesDeleteDto) {
    const { id } = params;
    const category = await this.repository.deleteCategory({
      where: { id },
    });
    return category;
  }

  async updaetCategory(params: CategoriesUpdateDto) {
    const { id, name } = params;
    const category = await this.repository.updateCategory({
      where: { id },
      data: { name },
    });
    return category;
  }
}
