// TODO: Implement calendar utilities
export const formatCalendarDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};
