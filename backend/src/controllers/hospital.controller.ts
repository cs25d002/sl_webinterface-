import type { Request, Response } from 'express';
import {
  getActiveHospitals,
  getActiveServicesForHospital,
  getHospitalBySlug,
  getHospitalService
} from '../services/hospitalRegistryService';

export function getHospitals(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: getActiveHospitals()
  });
}

export function getHospitalBySlugHandler(req: Request, res: Response): void {
  const { hospitalSlug } = req.params;
  const hospital = getHospitalBySlug(hospitalSlug);

  if (!hospital) {
    res.status(404).json({
      success: false,
      code: 'HOSPITAL_NOT_FOUND',
      message: 'The selected hospital could not be found.'
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: hospital
  });
}

export function getHospitalServicesHandler(req: Request, res: Response): void {
  const { hospitalSlug } = req.params;
  const hospital = getHospitalBySlug(hospitalSlug);

  if (!hospital) {
    res.status(404).json({
      success: false,
      code: 'HOSPITAL_NOT_FOUND',
      message: 'The selected hospital could not be found.'
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      hospital,
      services: getActiveServicesForHospital(hospitalSlug) ?? []
    }
  });
}

export function getHospitalServiceHandler(req: Request, res: Response): void {
  const { hospitalSlug, serviceSlug } = req.params;
  const hospital = getHospitalBySlug(hospitalSlug);

  if (!hospital) {
    res.status(404).json({
      success: false,
      code: 'HOSPITAL_NOT_FOUND',
      message: 'The selected hospital could not be found.'
    });
    return;
  }

  const service = getHospitalService(hospitalSlug, serviceSlug);

  if (!service) {
    res.status(404).json({
      success: false,
      code: 'SERVICE_NOT_FOUND',
      message: 'The selected service could not be found.'
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: service
  });
}
