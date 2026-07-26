import { apiClient } from './client';
import type { ApiResponse } from '../types/api';
import type { Hospital } from '../types/hospital';

export async function fetchHospitals(): Promise<Hospital[]> {
  const response = await apiClient.get<ApiResponse<Hospital[]>>('/hospitals');

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}

export async function fetchHospitalBySlug(slug: string): Promise<Hospital> {
  const response = await apiClient.get<ApiResponse<Hospital>>(`/hospitals/${slug}`);

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
}
