import apiClient from '@/lib/api/client';

// TODO: Implement public booking service
export const publicBookingService = {
  getAvailableSlots: async (params: any) => {
    const response = await apiClient.post('/public/booking/availability', params);
    return response.data;
  },
};
