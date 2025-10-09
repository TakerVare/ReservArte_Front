import apiClient from '@/lib/api/client';

// TODO: Implement customers service
export const customersService = {
  getAll: async () => {
    const response = await apiClient.get('/customers');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/customers/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post('/customers', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/customers/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    await apiClient.delete(`/customers/${id}`);
  },
};
