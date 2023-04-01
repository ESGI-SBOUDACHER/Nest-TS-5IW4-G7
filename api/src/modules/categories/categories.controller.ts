import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { createCategoryDto, deleteCategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Version('1')
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Version('1')
  @Get('get')
  getCategory(
    @Body()
    data: {
      id: number;
      name: string;
    },
  ) {
    return this.categoriesService.getCategory(data);
  }

  @Version('1')
  @Post('add')
  createCategory(@Body() body: createCategoryDto) {
    return this.categoriesService.createCategory(body);
  }

  @Version('1')
  @Post('delete')
  deleteCategory(@Body() body: deleteCategoryDto) {
    return this.categoriesService.deleteCategory(body);
  }
}
