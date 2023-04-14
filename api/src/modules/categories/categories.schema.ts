import { z } from 'nestjs-zod/z';

export const categoriesCreateSchema = z.object({
  name: z.string(),
});

export const categoriesUpdateSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CategoriesCreateSchema = z.infer<typeof categoriesCreateSchema>;
