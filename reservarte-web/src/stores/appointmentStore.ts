import { create } from 'zustand';

interface AppointmentState {
  appointments: any[];
  selectedAppointment: any | null;
  setAppointments: (appointments: any[]) => void;
  selectAppointment: (appointment: any) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  selectedAppointment: null,
  setAppointments: (appointments) => set({ appointments }),
  selectAppointment: (appointment) => set({ selectedAppointment: appointment }),
}));
