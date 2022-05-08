import api from './index';

export default {
  getMarketsList: (params) => api.get('/markets', {params}),
  getMarketById: (marketId) => api.get(`/markets/${marketId}`),
  toggleIsFavorite: (marketId) => api.put(`/markets/${marketId}/favorite`),
  upsertRate: (marketId, rate) => api.put(`/markets/${marketId}/rate`, {rate}),
  getMarketItems: (marketId, params) =>
    api.get(`/markets/${marketId}/items`, {params}),
  getMarketCategories: (marketId) => api.get(`/markets/${marketId}/categories`),
  getAllCategories: (search) =>
    api.get('/categories', {
      params: {
        search,
      },
    }),
  getItemsByCategory: (categoryId, search) =>
    api.get('/items', {params: {categoryId, search}}),
  getAvailableItemsByCategory: (categoryId, search, currentItemId) =>
    api.get('/items/available', {params: {categoryId, search, currentItemId}}),
  addItemToMenu: (marketId, data) =>
    api.put(`/markets/${marketId}/items`, data),
  removeItemFromMenu: (marketId, itemId) =>
    api.delete(`/markets/${marketId}/items`, {data: {itemId}}),
  updateMarket: (data) => api.put(`/markets/${data.id}`, data),
};
