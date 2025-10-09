import apiClient from '@/lib/api/client';

// TODO: Implement settings service
export const settingsService = {
  get: async () => {
    const response = await apiClient.get('/settings');
    return response.data;
  },
  update: async (data: any) => {
    const response = await apiClient.put('/settings', data);
    return response.data;
  },
};
