import api from './index';

export const subscriptionAPI = {
  subscribe: (params) => api.post('/subscriptions/subscribe', params),
  getPaymentIntent: (params) =>
    api.post('/subscriptions/create-offer-intent', params),
  getHistory: () => api.get('/subscriptions'),
};
