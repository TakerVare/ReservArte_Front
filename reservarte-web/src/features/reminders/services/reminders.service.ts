import apiClient from '@/lib/api/client';

// TODO: Implement reminders service
export const remindersService = {
  getConfiguration: async () => {
    const response = await apiClient.get('/reminders/configuration');
    return response.data;
  },
  updateConfiguration: async (data: any) => {
    const response = await apiClient.put('/reminders/configuration', data);
    return response.data;
  },
};
