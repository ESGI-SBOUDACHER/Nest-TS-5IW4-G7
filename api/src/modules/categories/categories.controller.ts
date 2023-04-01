import { Body, Controller, Get, Post, Version } from '@nestjs/common';
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
  createCategory(@Body() body: { name: string }) {
    return this.categoriesService.createCategory(body);
  }

  @Version('1')
  @Post('delete')
  deleteCategory(@Body() body: { name: string; id: number }) {
    return this.categoriesService.deleteCategory(body);
  }
}
