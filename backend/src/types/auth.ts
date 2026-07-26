import { z } from 'zod';

export const loginRequestSchema = z.object({
  hospitalSlug: z.string().min(1, 'Hospital is required.'),
  role: z.enum(['admin', 'user'], {
    errorMap: () => ({ message: 'Role must be either "admin" or "user".' })
  }),
  identifier: z.string().min(1, 'Email or username is required.'),
  password: z.string().min(6, 'Password must contain at least six characters.')
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
