import api from './api';

export const createPaymentIntent = async (orderId) => {
  const response = await api.post('/payment/create-intent', { orderId });
  return response.data;
};

export const confirmPayment = async (orderId) => {
  const response = await api.post('/payment/confirm', { orderId });
  return response.data;
};