import { Roles } from '@api/common/decorators/roles.decorator';
import { Body, Controller, Get, Patch, Post, Version } from '@nestjs/common';
import { Role } from '@prisma/client';
import { createCategoryDto, deleteCategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';

@Roles(Role.USER)
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

  @Roles(Role.ADMIN)
  @Version('1')
  @Post('add')
  createCategory(@Body() body: createCategoryDto) {
    return this.categoriesService.createCategory(body);
  }

  @Roles(Role.ADMIN)
  @Version('1')
  @Post('delete')
  deleteCategory(@Body() body: deleteCategoryDto) {
    return this.categoriesService.deleteCategory(body);
  }

  @Roles(Role.ADMIN)
  @Version('1')
  @Patch('update')
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
