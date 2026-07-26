import { Router } from 'express';
import {
  getHospitalBySlugHandler,
  getHospitalServiceHandler,
  getHospitalServicesHandler,
  getHospitals
} from '../controllers/hospital.controller';

export const hospitalRouter = Router();

hospitalRouter.get('/hospitals', getHospitals);
hospitalRouter.get('/hospitals/:hospitalSlug/services/:serviceSlug', getHospitalServiceHandler);
hospitalRouter.get('/hospitals/:hospitalSlug/services', getHospitalServicesHandler);
hospitalRouter.get('/hospitals/:hospitalSlug', getHospitalBySlugHandler);
