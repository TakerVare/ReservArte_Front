import apiClient from '@/lib/api/client';

// TODO: Implement profile service
export const profileService = {
  get: async () => {
    const response = await apiClient.get('/profile');
    return response.data;
  },
  update: async (data: any) => {
    const response = await apiClient.put('/profile', data);
    return response.data;
  },
};
