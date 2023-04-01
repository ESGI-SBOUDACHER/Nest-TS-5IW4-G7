import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Header,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  getArticles() {
    return this.articlesService.getArticles();
  }

  @Get(':id')
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public getArticle(@Param('id', ParseIntPipe) id: number) {
    {
      return this.articlesService.getArticle({ where: { id: id } });
    }
  }
}
