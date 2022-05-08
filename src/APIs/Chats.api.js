import api from './index';

export default {
  getAvailableChats: () => api.get('/chats/available'),
  getMessagesByOrderId: orderId => api.get(`/chats/${orderId}/messages`),
};
