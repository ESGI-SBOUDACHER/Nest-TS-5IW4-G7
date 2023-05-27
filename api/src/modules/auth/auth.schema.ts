import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.password().min(8),
});

const authRegisterSchema = authLoginSchema.extend({});

export class AuthLoginDto extends createZodDto(authLoginSchema) {}
export class AuthRegisterDto extends createZodDto(authRegisterSchema) {}
