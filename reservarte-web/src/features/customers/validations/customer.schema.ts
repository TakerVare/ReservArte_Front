import { z } from 'zod';

// TODO: Define customer validation schema
export const customerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
});
