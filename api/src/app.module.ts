import { Module } from '@nestjs/common';
import { ArticlesModule } from './modules/articles/articles.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import { CommentsModule } from './modules/comments/comments.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    CategoriesModule,
    CommentsModule,
    ArticlesModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
