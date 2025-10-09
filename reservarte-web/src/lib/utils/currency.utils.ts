export const formatAmount = (amount: number): string => {
  return (amount / 100).toFixed(2);
};

export const parseAmount = (amount: string): number => {
  return Math.round(parseFloat(amount) * 100);
};
