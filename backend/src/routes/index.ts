import { Router } from 'express';
import { healthRouter } from './health.routes';
import { hospitalRouter } from './hospital.routes';
import { authRouter } from './auth.routes';

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(hospitalRouter);
apiRouter.use(authRouter);
