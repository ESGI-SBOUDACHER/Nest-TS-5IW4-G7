import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  ArticlesCreateDto,
  ArticlesDeleteDto,
  ArticlesGetDto,
  ArticlesUpdateDto,
} from './articles.schema';
import { ArticlesService } from './articles.service';

@Controller('articles')
@Roles(Role.USER)
@UseGuards(RolesGuard)
export default class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  @Version('1')
  getArticles() {
    return this.articleService.getArticles();
  }

  @Get(':id')
  @Version('1')
  getArticle(@Body(ZodValidationPipe) data: ArticlesGetDto) {
    return this.articleService.getArticle(data);
  }

  @Post()
  @Roles(Role.ADMIN)
  @Version('1')
  createArticle(@Body(ZodValidationPipe) data: ArticlesCreateDto) {
    return this.articleService.createArticle(data);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @Version('1')
  updateArticle(@Body(ZodValidationPipe) data: ArticlesUpdateDto) {
    return this.articleService.updateArticle(data);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @Version('1')
  deleteArticle(@Body(ZodValidationPipe) data: ArticlesDeleteDto) {
    return this.articleService.deleteArticle(data);
  }
}
