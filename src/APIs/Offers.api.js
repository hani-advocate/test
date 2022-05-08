import api from './index';

export default {
  getOffersList: (params) => api.get('/advertisements', {params}),
  createOrUpdateOffer: (data) =>
    data.id
      ? api.put(`/advertisements/${data.id}`, data)
      : api.post('/advertisements', data),
  doUpload: (data) =>
    api.post('/utils/upload', data, {
      headers: {'Content-Type': 'multipart/form-data'},
    }),
  getPaymentIntentForOffer: (params) =>
    api.post('advertisements/offer-payment-intent', params),
  PayViaSEPA: (params) => api.post('advertisements/offer-payment-sepa', params),
};
