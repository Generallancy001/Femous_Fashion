export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(price);
};

export const extractNameFromEmail = (email: string): string => {
  return email.split('@')[0];
};

export const WHATSAPP_NUMBER = '2348104038155';