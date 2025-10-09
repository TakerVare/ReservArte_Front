import { create } from 'zustand';

interface CalendarState {
  view: 'day' | 'week' | 'month';
  selectedDate: Date;
  setView: (view: 'day' | 'week' | 'month') => void;
  setSelectedDate: (date: Date) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  view: 'week',
  selectedDate: new Date(),
  setView: (view) => set({ view }),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
