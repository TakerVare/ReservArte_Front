import apiClient from '@/lib/api/client';

// TODO: Implement payments service
export const paymentsService = {
  getAll: async () => {
    const response = await apiClient.get('/payments');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/payments/${id}`);
    return response.data;
  },
};
