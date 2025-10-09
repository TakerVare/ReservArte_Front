import { z } from 'zod';

// TODO: Define service validation schema
export const serviceSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  durationMinutes: z.number().min(15),
  basePrice: z.number().min(0),
});
