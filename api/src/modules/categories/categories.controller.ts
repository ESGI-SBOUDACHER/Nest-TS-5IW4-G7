import { Roles } from '@api/common/decorators/roles.decorator';
import { Body, Controller, Get, Patch, Post, Version } from '@nestjs/common';
import { Role } from '@prisma/client';
import { createCategoryDto, deleteCategoryDto } from './categories.dto';
import { CategoriesCreatePipe } from './categories.pipe';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Version('1')
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('get')
  @Version('1')
  getCategory(
    @Body()
    data: {
      id: number;
      name: string;
    },
  ) {
    return this.categoriesService.getCategory(data);
  }

  @Post('add')
  @Roles(Role.ADMIN)
  @Version('1')
  createCategory(@Body(CategoriesCreatePipe) body: createCategoryDto) {
    return this.categoriesService.createCategory(body);
  }

  @Post('delete')
  @Roles(Role.ADMIN)
  @Version('1')
  deleteCategory(@Body() body: deleteCategoryDto) {
    return this.categoriesService.deleteCategory(body);
  }

  @Patch('update')
  @Roles(Role.ADMIN)
  @Version('1')
  updateCategory(
    @Body()
    data: {
      id: number;
      name: string;
    },
  ) {
    return this.categoriesService.updaetCategory(data);
  }
}
