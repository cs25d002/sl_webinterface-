import type { Hospital } from '../types/hospital';
import { demoHospitals } from '../data/hospitals';

export function listHospitals(): Hospital[] {
  return demoHospitals;
}

export function findHospitalBySlug(slug: string): Hospital | undefined {
  return demoHospitals.find((hospital) => hospital.slug === slug);
}
