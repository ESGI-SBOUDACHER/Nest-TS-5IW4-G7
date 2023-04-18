import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import {
  ArticlesCreateDto,
  ArticlesDeleteDto,
  ArticlesGetDto,
  ArticlesUpdateDto,
} from './articles.schema';

@Injectable()
export class ArticlesService {
  constructor(private repository: ArticlesRepository) {}

  async getArticles() {
    const articles = await this.repository.getArticles({});
    return articles;
  }

  async getArticle(params: ArticlesGetDto) {
    const { id } = params;
    const Article = await this.repository.getArticle({
      where: { id },
    });
    return Article;
  }

  async createArticle(params: ArticlesCreateDto) {
    const { title, content, authorId, categoryId, isPublished } = params;
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

  async deleteArticle(params: ArticlesDeleteDto) {
    const { id } = params;
    const article = await this.repository.deleteArticle({ where: { id } });
    return article;
  }

  async updateArticle(params: ArticlesUpdateDto) {
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
