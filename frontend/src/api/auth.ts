import { apiClient } from './client';
import type { LoginApiResponse, LoginPayload } from '../types/auth';

export async function loginRequest(payload: LoginPayload): Promise<LoginApiResponse> {
  const response = await apiClient.post<LoginApiResponse>('/auth/login', payload);
  return response.data;
}
