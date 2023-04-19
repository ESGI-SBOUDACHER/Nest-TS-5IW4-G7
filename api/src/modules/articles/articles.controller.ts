import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Article, Role } from '@prisma/client';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  ArticlesCreateDto,
  ArticlesDeleteDto,
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
  public getArticles(): Promise<Article[]> {
    return this.articleService.getArticles();
  }

  @Get(':id')
  @Version('1')
  public getArticle(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articleService.getArticle({ id });
  }

  @Post()
  @Roles(Role.ADMIN)
  @Version('1')
  public createArticle(
    @Body(ZodValidationPipe) data: ArticlesCreateDto,
  ): Promise<Article> {
    return this.articleService.createArticle(data);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @Version('1')
  public updateArticle(
    @Body(ZodValidationPipe) data: ArticlesUpdateDto,
  ): Promise<Article> {
    return this.articleService.updateArticle(data);
  }

  @Delete('')
  @Roles(Role.ADMIN)
  @Version('1')
  public deleteArticle(
    @Body(ZodValidationPipe) data: ArticlesDeleteDto,
  ): Promise<Article> {
    return this.articleService.deleteArticle(data);
  }
}
