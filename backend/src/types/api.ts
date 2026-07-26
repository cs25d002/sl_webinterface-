export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  code: string;
  message: string;
  errors?: unknown[];
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
