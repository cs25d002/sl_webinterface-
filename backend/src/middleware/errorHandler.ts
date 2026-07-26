import type { NextFunction, Request, Response } from 'express';
import { isProduction } from '../config/env';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const message = err instanceof Error ? err.message : 'Unexpected server error.';

  // eslint-disable-next-line no-console
  console.error('Unhandled request error:', message);

  res.status(500).json({
    success: false,
    code: 'INTERNAL_SERVER_ERROR',
    message: isProduction ? 'An unexpected error occurred.' : message
  });
}
