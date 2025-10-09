import apiClient from '@/lib/api/client';

// TODO: Implement services service
export const servicesService = {
  getAll: async () => {
    const response = await apiClient.get('/services');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post('/services', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/services/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    await apiClient.delete(`/services/${id}`);
  },
};
