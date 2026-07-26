export type LoginRole = 'admin' | 'user';

export interface LoginPayload {
  hospitalSlug: string;
  role: LoginRole;
  identifier: string;
  password: string;
}

export interface LoginApiResponse {
  success: boolean;
  code: string;
  message: string;
}
