import api from './index';

export default {
  getOrders: (params) => api.get('/orders', {params}),
  getOrderById: (orderId) => api.get(`/orders/${orderId}`),
  checkout: (data) => api.post('/orders/checkout', data),
  createOrder: (data) => api.post('/orders', data),
  updateOrder: (orderId, data) => api.put(`/orders/${orderId}`, data),
  changeOrderStatus: (orderId, status) =>
    api.put(`/orders/${orderId}/${status}`),
  rateOrder: (marketId, rate) => api.put(`/markets/${marketId}/rate`, {rate}),
};
