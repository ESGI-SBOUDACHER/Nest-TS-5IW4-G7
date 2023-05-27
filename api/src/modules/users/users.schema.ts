import { Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const usersGetSchema = z.object({
  email: z.string().email(),
});

const usersDeleteSchema = z.object({
  id: z.number().int().positive(),
});

const usersUpdateSchema = z.object({
  email: z.string().email(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  roles: z.array(z.enum([Role.ADMIN, Role.USER])).optional(),
});

export class UsersGetDto extends createZodDto(usersGetSchema) {}

export class UsersDeleteDto extends createZodDto(usersDeleteSchema) {}

export class UsersUpdateDto extends createZodDto(usersUpdateSchema) {}
