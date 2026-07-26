import type { Request, Response } from 'express';
import { loginRequestSchema } from '../types/auth';

export function postLogin(req: Request, res: Response): void {
  const parsed = loginRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      code: 'VALIDATION_ERROR',
      message: 'The submitted information is invalid.',
      errors: parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    });
    return;
  }

  // Credentials are intentionally never logged, persisted, or compared here.
  // Real authentication is out of scope for this development phase.
  res.status(200).json({
    success: false,
    code: 'AUTHENTICATION_NOT_CONFIGURED',
    message: 'Authentication will be enabled in the next development phase.'
  });
}
