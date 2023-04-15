import { Roles } from '@api/common/decorators/roles.decorator';
import { RolesGuard } from '@api/common/guards/roles.guard';
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
  UseGuards,
  Version,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { CreateArticlesDto, UpdateArticlesDto } from './articles.dto';
import { ArticlesService } from './articles.service';

@Controller('articles')
@Roles(Role.USER)
@UseGuards(RolesGuard)
export default class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  @HttpCode(200)
  @Version('1')
  getArticles() {
    return this.articleService.getArticles();
  }

  @Get(':id')
  @HttpCode(200)
  @Version('1')
  public getArticle(@Param('id', ParseIntPipe) id: number) {
    {
      return this.articleService.getArticle({ where: { id: id } });
    }
  }

  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(201)
  @Version('1')
  public createArticle(
    @Body()
    data: CreateArticlesDto,
  ) {
    return this.articleService.createArticle({ data });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @Version('1')
  public deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.deleteArticle({ where: { id: id } });
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @Version('1')
  public updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: UpdateArticlesDto,
  ) {
    return this.articleService.updateArticle({ where: { id: id }, data });
  }
}
