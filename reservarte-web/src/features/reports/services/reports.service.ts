import apiClient from '@/lib/api/client';

// TODO: Implement reports service (FASE 2/FUTURO)
export const reportsService = {
  getExecutive: async () => {
    const response = await apiClient.get('/reports/executive');
    return response.data;
  },
};
