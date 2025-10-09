import apiClient from '@/lib/api/client';

// TODO: Implement employees service
export const employeesService = {
  getAll: async () => {
    const response = await apiClient.get('/employees');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post('/employees', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await apiClient.put(`/employees/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    await apiClient.delete(`/employees/${id}`);
  },
};
