import type { Request, Response } from 'express';
import { findHospitalBySlug, listHospitals } from '../services/hospital.service';

export function getHospitals(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: listHospitals()
  });
}

export function getHospitalBySlug(req: Request, res: Response): void {
  const { slug } = req.params;
  const hospital = findHospitalBySlug(slug);

  if (!hospital) {
    res.status(404).json({
      success: false,
      code: 'HOSPITAL_NOT_FOUND',
      message: `No hospital was found for slug "${slug}".`
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: hospital
  });
}
