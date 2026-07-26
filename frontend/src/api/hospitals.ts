import { apiClient } from './client';
import type { ApiResponse } from '../types/api';
import type { Hospital, HospitalService } from '../types/hospital';

export interface HospitalServicesPayload {
  hospital: Hospital;
  services: HospitalService[];
}

export async function fetchHospitals(): Promise<Hospital[]> {
  const response = await apiClient.get<ApiResponse<Hospital[]>>('/hospitals');

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

export async function fetchHospitalBySlug(hospitalSlug: string): Promise<Hospital> {
  const response = await apiClient.get<ApiResponse<Hospital>>(`/hospitals/${hospitalSlug}`);

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

export async function fetchHospitalServices(hospitalSlug: string): Promise<HospitalServicesPayload> {
  const response = await apiClient.get<ApiResponse<HospitalServicesPayload>>(`/hospitals/${hospitalSlug}/services`);

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

export async function fetchHospitalService(hospitalSlug: string, serviceSlug: string): Promise<HospitalService> {
  const response = await apiClient.get<ApiResponse<HospitalService>>(
    `/hospitals/${hospitalSlug}/services/${serviceSlug}`
  );

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}
