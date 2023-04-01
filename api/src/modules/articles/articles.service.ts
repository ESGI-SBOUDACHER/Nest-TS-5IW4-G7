import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { ArticlesRepository } from './articles.repository';
import { CreateArticlesDto, UpdateArticlesDto } from './articles.dto';

@Injectable()
export class ArticlesService {
  constructor(private repository: ArticlesRepository) {}

  async getArticles() {
    const articles = await this.repository.getArticles({});
    return articles;
  }

  async getArticle(params: { where: { id: Article['id'] } }) {
    const { where } = params;
    const Article = await this.repository.getArticle({ where });
    return Article;
  }

  async createArticle(params: { data: CreateArticlesDto }) {
    const { title, content, authorId, categoryId, isPublished } = params.data;
    const article = await this.repository.createArticle({
      data: {
        title,
        content,
        author: {
          connect: {
            id: authorId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
        isPublished,
      },
    });
    return article;
  }

  async deleteArticle(params: { where: { id: Article['id'] } }) {
    const { where } = params;
    const article = await this.repository.deleteArticle({ where });
    return article;
  }

  async updateArticle(params: {
    where: { id: Article['id'] };
    data: UpdateArticlesDto;
  }) {
    const { where } = params;
    const { title, content, categoryId, isPublished } = params.data;
    const article = await this.repository.updateArticle({
      where,
      data: {
        title,
        content,
        category: {
          connect: {
            id: categoryId ?? undefined,
          },
        },
        isPublished,
      },
    });
    return article;
  }
}
