import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const articlesGetSchema = z.object({
  id: z.number().int().positive(),
});

const articlesCreateSchema = z.object({
  title: z.string().min(1).max(255).trim(),
  content: z.string().min(1).min(10).trim(),
  isPublished: z.boolean().optional(),
  categoryId: z.number().int().positive(),
});

const articlesUpdateSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().max(255).trim().optional(),
  content: z.string().min(10).trim().optional(),
  isPublished: z.boolean().optional(),
  authorId: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional(),
});

const articlesDeleteSchema = z.object({
  id: z.number().int().positive(),
});

export class ArticlesGetDto extends createZodDto(articlesGetSchema) {}

export class ArticlesCreateDto extends createZodDto(articlesCreateSchema) {}

export class ArticlesUpdateDto extends createZodDto(articlesUpdateSchema) {}

export class ArticlesDeleteDto extends createZodDto(articlesDeleteSchema) {}
