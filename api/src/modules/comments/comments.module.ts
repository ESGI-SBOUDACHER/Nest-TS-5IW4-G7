import { ArticlesRepository } from '@api/modules/articles/articles.repository';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
  imports: [PrismaModule],
  providers: [CommentsRepository, CommentsService, ArticlesRepository],
  exports: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
