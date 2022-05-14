import api from './index';

export const subscriptionAPI = {
  subscribe: params => api.post('/subscriptions/subscribe', params),
  getPaymentIntent: params =>
    api.post('/subscriptions/create-offer-intent', params),
  getHistory: () => api.get('/subscriptions'),
  getKeys: () => api.get('/subscriptions/stripe-key'),
  createSubscription: params =>
    api.post('/subscriptions/create-subscription', params),
  createPayment: params => api.post('/subscriptions/create-payment', params),
};
