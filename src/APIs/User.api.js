import api from './index';

export default {
  changePassword: (userId, payload) =>
    api.post(`/users/${userId}/change-password`, payload),
  fetchCurrentUser: () => api.get('/users/me'),
  createOrUpdateAddress: (id, data) =>
    id
      ? api.put(`/users/me/address/${id}`, data)
      : api.post('/users/me/address', data),
  registerDevice: (deviceId) =>
    api.post('/users/me/register-device', {deviceId}),
  updateProfile: (data) => api.put('/users/me', data),
  unreadNotificationsCount: () => api.get('/users/me/unread-notifications'),
  getCheckoutSession: (params) =>
    api.post('/subscriptions/checkout-session', params),
  createAssistant: (data) => api.post('/users/assistants', data),
  getAssistants: (params) => api.get('/users/assistants', {params}),
  deleteAssistant: (assistantId) =>
    api.delete(`/users/assistants/${assistantId}`),
};
