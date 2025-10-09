import apiClient from '@/lib/api/client';

// TODO: Implement appointments service
export const appointmentsService = {
  getAll: async () => {
    const response = await apiClient.get('/appointments');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/appointments/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post('/appointments', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/appointments/${id}`, data);
    return response.data;
  },
  cancel: async (id: string, reason: string) => {
    await apiClient.post(`/appointments/${id}/cancel`, { reason });
  },
  checkAvailability: async (params: any) => {
    const response = await apiClient.post('/appointments/availability', params);
    return response.data;
  },
};
