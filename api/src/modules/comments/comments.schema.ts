import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const commentsGetSchema = z.object({
  id: z.number().int().positive(),
});

const commentsCreateSchema = z.object({
  content: z.string().min(1).max(255).trim(),
  authorId: z.number().int().positive().optional(),
  articleId: z.number().int().positive(),
});

const commentsUpdateSchema = z.object({
  id: z.number().int().positive(),
  content: z.string().min(1).max(255).trim(),
  authorId: z.number().int().positive().optional(),
  articleId: z.number().int().positive(),
});

const commentsDeleteSchema = z.object({
  id: z.number().int().positive(),
});

const commentsGetByArticleSchema = z.object({
  idArticle: z.number().int().positive(),
});

export class CommentsGetDto extends createZodDto(commentsGetSchema) {}
export class CommentsCreateDto extends createZodDto(commentsCreateSchema) {}
export class CommentsUpdateDto extends createZodDto(commentsUpdateSchema) {}
export class CommentsDeleteDto extends createZodDto(commentsDeleteSchema) {}
export class CommentsGetByArticleDto extends createZodDto(
  commentsGetByArticleSchema,
) {}
