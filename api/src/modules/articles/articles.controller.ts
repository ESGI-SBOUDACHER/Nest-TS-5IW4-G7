import { Roles } from '@api/common/decorators/roles.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateArticlesDto, UpdateArticlesDto } from './articles.dto';
import { ArticlesService } from './articles.service';

@Roles(Role.USER)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Version('1')
  @Get()
  @HttpCode(200)
  getArticles() {
    return this.articleService.getArticles();
  }

  @Version('1')
  @Get(':id')
  @HttpCode(200)
  public getArticle(@Param('id', ParseIntPipe) id: number) {
    {
      return this.articleService.getArticle({ where: { id: id } });
    }
  }

  @Version('1')
  @Roles(Role.ADMIN)
  @Post()
  @HttpCode(201)
  public createArticle(
    @Body()
    data: CreateArticlesDto,
  ) {
    return this.articleService.createArticle({ data });
  }

  @Version('1')
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(200)
  public deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.deleteArticle({ where: { id: id } });
  }

  @Version('1')
  @Roles(Role.ADMIN)
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
