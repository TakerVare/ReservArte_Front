// ⭐ TODO: Define Redsys-specific types
export interface RedsysConfig {
  merchantCode: string;
  terminal: string;
  environment: 'test' | 'production';
}

export interface RedsysPaymentRequest {
  appointmentId: string;
  orderNumber: string;
  idOper: string;
  saveCard: boolean;
}
