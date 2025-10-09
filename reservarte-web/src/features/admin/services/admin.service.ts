import apiClient from '@/lib/api/client';

// TODO: Implement admin service (FASE 3 - SaaS)
export const adminService = {
  getAllOrganizations: async () => {
    const response = await apiClient.get('/admin/organizations');
    return response.data;
  },
};
