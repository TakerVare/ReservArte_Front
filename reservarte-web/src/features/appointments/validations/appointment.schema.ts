import { z } from 'zod';

// TODO: Define appointment validation schema
export const appointmentSchema = z.object({
  customerId: z.string().uuid(),
  employeeId: z.string().uuid(),
  serviceId: z.string().uuid(),
  appointmentDate: z.string(),
  startTime: z.string(),
});
