import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
