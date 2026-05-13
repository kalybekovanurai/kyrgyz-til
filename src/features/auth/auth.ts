import { apiClient } from '@/src/lib/api';
import { AdminLoginPayload, AdminLoginResponse } from './types';

export async function loginAdmin(payload: AdminLoginPayload): Promise<AdminLoginResponse> {
  const response = await apiClient.post<AdminLoginResponse>('/api/auth/login', payload);
  return response.data;
}

export async function validateAdminToken(token: string): Promise<void> {
  await apiClient.get('/api/auth/me', {
    headers: { 'x-admin-token': token },
  });
}
