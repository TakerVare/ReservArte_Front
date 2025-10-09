// TODO: Define payment types
export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
}
