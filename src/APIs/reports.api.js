import api from './index';

export const reportAPI = {
  overview: () => api.post('/reports/overview'),
  details: (type, dateRange) => api.post(`/reports/details/${type}`, dateRange),
  itemsSales: (params) => api.post('/reports/items', params),
};
