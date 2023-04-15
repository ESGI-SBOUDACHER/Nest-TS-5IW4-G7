import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const categoriesGetSchema = z.object({
  id: z.number().int().positive(),
});

const categoriesCreateSchema = z.object({
  name: z.string().min(1).max(255).trim(),
});

const categoriesUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(255).trim(),
});

const categoriesDeleteSchema = z.object({
  id: z.number().int().positive(),
});

export class CategoriesGetDto extends createZodDto(categoriesGetSchema) {}

export class CategoriesCreateDto extends createZodDto(categoriesCreateSchema) {}

export class CategoriesUpdateDto extends createZodDto(categoriesUpdateSchema) {}

export class CategoriesDeleteDto extends createZodDto(categoriesDeleteSchema) {}
