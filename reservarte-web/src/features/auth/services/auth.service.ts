import apiClient from '@/lib/api/client';

// TODO: Implement auth service
export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (data: any) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
  logout: async () => {
    // TODO: Implement logout
  },
};
