import { Router } from 'express';
import { getHospitalBySlug, getHospitals } from '../controllers/hospital.controller';

export const hospitalRouter = Router();

hospitalRouter.get('/hospitals', getHospitals);
hospitalRouter.get('/hospitals/:slug', getHospitalBySlug);
