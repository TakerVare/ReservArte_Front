// TODO: Define appointment types
export interface Appointment {
  id: string;
  customerId: string;
  employeeId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: number;
}
