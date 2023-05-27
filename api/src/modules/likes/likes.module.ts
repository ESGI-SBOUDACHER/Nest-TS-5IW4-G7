import { PrismaModule } from '@api/database/prisma.module';
import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesRepository } from './likes.repository';
import { LikesService } from './likes.service';

@Module({
  imports: [PrismaModule],
  providers: [LikesRepository, LikesService],
  exports: [LikesService],
  controllers: [LikesController],
})
export class LikeModule {}
