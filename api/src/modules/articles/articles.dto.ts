import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateArticlesDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  isPublished?: boolean;

  @IsInt()
  authorId: number;

  @IsInt()
  categoryId: number;
}

export class UpdateArticlesDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  isPublished?: boolean;

  @IsInt()
  categoryId: number;
}
