// ⭐ TODO: Implement Redsys utility functions
export const generateOrderNumber = (): string => {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const timePart = now.toTimeString().slice(0, 8).replace(/:/g, '');
  const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${datePart}${timePart}${randomPart}`.slice(0, 12);
};
