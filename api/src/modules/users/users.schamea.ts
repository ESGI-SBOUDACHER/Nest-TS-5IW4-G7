import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const usersGetSchema = z.object({
  email: z.string().email(),
});

const usersDeleteSchema = z.object({
  id: z.number().int().positive(),
});

export class UsersGetDto extends createZodDto(usersGetSchema) {}

export class UsersDeleteDto extends createZodDto(usersDeleteSchema) {}
