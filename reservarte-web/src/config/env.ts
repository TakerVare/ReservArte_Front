export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  APP_NAME: import.meta.env.VITE_APP_NAME || 'ReservArte',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
  REDSYS_ENVIRONMENT: import.meta.env.VITE_REDSYS_ENVIRONMENT || 'test',
  REDSYS_SDK_URL: import.meta.env.VITE_REDSYS_SDK_URL || 'https://sis-t.redsys.es:25443/sis/NC/redsysV3.js',
  ENABLE_SAVED_CARDS: import.meta.env.VITE_ENABLE_SAVED_CARDS === 'true',
  ENABLE_WHATSAPP: import.meta.env.VITE_ENABLE_WHATSAPP === 'true',
  ENABLE_PUBLIC_BOOKING: import.meta.env.VITE_ENABLE_PUBLIC_BOOKING === 'true',
} as const;
