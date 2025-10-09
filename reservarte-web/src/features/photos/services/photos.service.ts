import apiClient from '@/lib/api/client';

// TODO: Implement photos service
export const photosService = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/photos', formData);
    return response.data;
  },
};
