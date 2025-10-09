import apiClient from '@/lib/api/client';

// TODO: Implement dashboard service
export const dashboardService = {
  getMetrics: async () => {
    const response = await apiClient.get('/dashboard/metrics');
    return response.data;
  },
};
