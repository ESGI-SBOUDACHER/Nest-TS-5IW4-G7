import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Article, PrismaClient, Role } from '@prisma/client';
import { ArticlesRepository } from './articles.repository';
import {
  ArticlesCreateDto,
  ArticlesDeleteDto,
  ArticlesGetDto,
  ArticlesUpdateDto,
} from './articles.schema';

@Injectable()
export class ArticlesService {
  constructor(
    private repository: ArticlesRepository,
    @Inject(REQUEST) private readonly request: any, // A voir pour request sans le any
  ) {}

  async getArticles(): Promise<Article[]> {
    let articles: Article[] = [];
    if (this.request.user.roles.includes(Role.ADMIN))
      articles = await this.repository.getArticles({});
    else
      articles = await this.repository.getArticles({
        where: { isPublished: true },
      });
    return articles;
  }

  async getArticle(params: ArticlesGetDto): Promise<Article> {
    const prisma = new PrismaClient();
    const { id } = params;
    let article: Article = null;

    if (this.request.user.roles.includes(Role.ADMIN))
      article = await this.repository.getArticle({
        where: { id },
      });
    else
      article = await prisma.article.findFirst({
        where: { id, isPublished: true },
      });

    return article;
  }

  async createArticle(params: ArticlesCreateDto): Promise<Article> {
    const { title, content, categoryId, isPublished } = params;
    const article = await this.repository.createArticle({
      data: {
        title,
        content,
        author: {
          connect: {
            id: this.request.user.id,
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

  async deleteArticle(params: ArticlesDeleteDto): Promise<Article> {
    const { id } = params;
    const article = await this.repository.deleteArticle({ where: { id } });
    return article;
  }

  async updateArticle(params: ArticlesUpdateDto): Promise<Article> {
    const { id, title, content, categoryId, isPublished } = params;

    const updatedArticle = {
      where: { id },
      data: {
        title,
        content,
        isPublished,
      },
    };

    // If category is provided
    if (categoryId) {
      updatedArticle.data['category'] = {
        connect: {
          id: categoryId,
        },
      };
    }
    const article = await this.repository.updateArticle(updatedArticle);

    return article;
  }
}
