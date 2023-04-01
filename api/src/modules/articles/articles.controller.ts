import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Header,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticlesDto, UpdateArticlesDto } from './articles.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  @HttpCode(200)
  getArticles() {
    return this.articleService.getArticles();
  }

  @Get(':id')
  @HttpCode(200)
  public getArticle(@Param('id', ParseIntPipe) id: number) {
    {
      return this.articleService.getArticle({ where: { id: id } });
    }
  }

  @Post()
  @HttpCode(201)
  public createArticle(
    @Body()
    data: CreateArticlesDto,
  ) {
    return this.articleService.createArticle({ data });
  }

  @Delete(':id')
  @HttpCode(200)
  public deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.deleteArticle({ where: { id: id } });
  }

  @Patch(':id')
  @HttpCode(200)
  public updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: UpdateArticlesDto,
  ) {
    return this.articleService.updateArticle({ where: { id: id }, data });
  }
}
