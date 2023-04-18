import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import ArticlesController from './articles.controller';
import { ArticlesRepository } from './articles.repository';
import { ArticlesService } from './articles.service';

@Module({
  imports: [PrismaModule],
  providers: [ArticlesRepository, ArticlesService],
  exports: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
