import apiClient from '@/lib/api/client';

// ⭐ TODO: Implement Redsys payment service
export const redsysService = {
  getConfig: async () => {
    const response = await apiClient.get('/payments/redsys/config');
    return response.data;
  },
  completeInsitePayment: async (data: any) => {
    const response = await apiClient.post('/payments/redsys/insite/complete', data);
    return response.data;
  },
  initPreAuthorization: async (data: any) => {
    const response = await apiClient.post('/payments/redsys/pre-authorize', data);
    return response.data;
  },
};
