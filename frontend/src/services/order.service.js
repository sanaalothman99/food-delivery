import api from './api';

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get('/orders/my');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}/status`, { status });
  return response.data;
};

export const getRestaurantOrders = async (restaurantId) => {
  const response = await api.get(`/orders/restaurant/${restaurantId}`);
  return response.data;
};

export const assignDriver = async (orderId) => {
  const response = await api.put(`/orders/${orderId}/assign`);
  return response.data;
};