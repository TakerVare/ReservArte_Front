export const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPhone = (phone: string): string => {
  // Format Spanish phone numbers
  return phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
};
