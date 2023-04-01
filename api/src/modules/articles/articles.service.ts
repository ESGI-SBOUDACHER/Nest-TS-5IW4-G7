import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { ArticlesRepository } from './articles.repository';

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
}
