import { Body, Controller, Post, Version } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Version('1')
  @Post('add')
  createCategory(@Body() body: { name: string }) {
    return this.categoriesService.createCategory(body);
  }
}
