import api from '@api/Markets.api';

const findMarket = (markets, marketId) => markets.find(x => x.id === marketId);

export const Markets = {
  state: {
    list: [],
    count: 0,
    market: {},
  },
  reducers: {
    clearMarket(state, payload) {
      return {...state, market: {}};
    },
    storeList(state, payload) {
      return {...state, list: payload.list, count: payload.count};
    },
    storeMarket(state, payload) {
      return {...state, ...payload};
    },
    storeToggleResult(state, payload) {
      return {...state, market: payload};
    },
  },
  effects: dispatch => ({
    async getMarketsList(payload, state) {
      const {data, count} = await api.getMarketsList(payload);
      dispatch.Markets.storeList({data, count});
    },
    async getMarketById(marketId, state) {
      const data = await Promise.props({
        market: api.getMarketById(marketId),
        categories: api.getMarketCategories(marketId),
      });
      dispatch.Markets.storeMarket(data);
    },
    async toggleFavorite(marketId, state) {
      await api.toggleIsFavorite(marketId);
      state.market.isFav = !state.market.isFav;
      dispatch.Markets.storeToggleResult(state.market);
    },
    async upsertRate(payload) {
      await api.upsertRate(payload);
    },
  }),
};
