import { IsInt, IsString } from 'class-validator';

export class deleteCategoryDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}

export class createCategoryDto {
  @IsString()
  name: string;
}
