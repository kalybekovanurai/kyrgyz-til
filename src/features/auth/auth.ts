import { apiClient } from '@/src/lib/api';
import { AdminLoginPayload, AdminLoginResponse } from './types';
export const loginAdmin = async (payload: AdminLoginPayload): Promise<AdminLoginResponse> => {
    const response = await apiClient.post<AdminLoginResponse>('/api/auth/login', payload);
    return response.data;
};
export const validateAdminToken = async (token: string): Promise<void> => {
    await apiClient.get('/api/auth/me', {
        headers: { 'x-admin-token': token },
    });
};
