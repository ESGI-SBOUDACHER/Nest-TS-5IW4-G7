import { Module } from '@nestjs/common';
import { PrismaModule } from './../../database/prisma.module';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { CategoriesService } from './categories.service';

@Module({
  imports: [PrismaModule],
  providers: [CategoriesRepository, CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
