import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CategoriesCreateDto,
  CategoriesDeleteDto,
  CategoriesGetDto,
  CategoriesUpdateDto,
} from './categories.schema';
import { CategoriesService } from './categories.service';

@Controller('categories')
@Roles(Role.USER)
@UseGuards(RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Version('1')
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('get')
  @Version('1')
  getCategory(@Body(ZodValidationPipe) data: CategoriesGetDto) {
    return this.categoriesService.getCategory(data);
  }

  @Post('add')
  @Roles(Role.ADMIN)
  @Version('1')
  createCategory(@Body(ZodValidationPipe) body: CategoriesCreateDto) {
    return this.categoriesService.createCategory(body);
  }

  @Post('delete')
  @Roles(Role.ADMIN)
  @Version('1')
  deleteCategory(@Body(ZodValidationPipe) body: CategoriesDeleteDto) {
    return this.categoriesService.deleteCategory(body);
  }

  @Patch('update')
  @Roles(Role.ADMIN)
  @Version('1')
  updateCategory(@Body(ZodValidationPipe) data: CategoriesUpdateDto) {
    return this.categoriesService.updaetCategory(data);
  }
}
