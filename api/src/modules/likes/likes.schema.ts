import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const likesGetSchema = z.object({
  id: z.number().int().positive(),
});

const likesCreateSchema = z.object({
  articleId: z.number().int().positive(),
});

const likesDeleteSchema = z.object({
  id: z.number().int().positive(),
});

export class LikesGetDto extends createZodDto(likesGetSchema) {}

export class LikesCreateDto extends createZodDto(likesCreateSchema) {}

export class LikesDeleteDto extends createZodDto(likesDeleteSchema) {}
