import api from '@api/Markets.api';
import {
  ADD_ITEM_TO_MENU,
  ALL_CATEGORIES_FETCHED,
  CLEAR_ALL_MENU_ITEMS,
  ITEMS_BY_CATEGORY_FETCHED,
  MARKET_CATEGORIES_FETCHED,
  MARKET_ITEMS_FETCHED,
  MARKET_ITEMS_FILTER_FETCHED,
  MARKETS_LIST_FETCHED,
  NAVIGATE_TO_MARKET,
  REMOVE_FROM_MENU,
  TOGGLE_IS_FAVORITE,
} from '@types/index';

import {trackPromise} from 'react-promise-tracker';
import reactotron from 'reactotron-react-native';

export const fetchMarketsList = (filters) => async (dispatch) => {
  try {
    const res = await trackPromise(api.getMarketsList(filters));
    await dispatch({type: MARKETS_LIST_FETCHED, payload: res});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getMarketCategories = (marketId) => async (dispatch) => {
  try {
    const {data} = await trackPromise(
      api.getMarketCategories(marketId),
      'add-to-menu',
    );
    await dispatch({type: MARKET_CATEGORIES_FETCHED, payload: data});
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getMarketItems =
  (marketId, params) => async (dispatch, getState) => {
    try {
      const {
        Markets: {marketItems},
      } = getState();
      const {data} = await api.getMarketItems(marketId, params);
      const temp = params.offset > 0 ? [...marketItems, ...data] : data;
      await dispatch({type: MARKET_ITEMS_FETCHED, payload: temp});
      await dispatch({
        type: 'HIDE_CATEGORIES_FILTER',
        payload: params.search && params.search !== '' && data.length,
      });
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

export const getFilteredItems = (marketId, search) => async (dispatch) => {
  try {
    const {data} = await api.getMarketItems(marketId, {search});
    await dispatch({type: MARKET_ITEMS_FILTER_FETCHED, payload: data});
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const navigateToMarket = (market) => async (dispatch) => {
  try {
    return dispatch({type: NAVIGATE_TO_MARKET, payload: market});
  } catch (e) {
    console.log(e);
  }
};

export const toggleIsFavorite = (marketId) => async (dispatch, getState) => {
  try {
    const {
      Markets: {market},
    } = getState();
    await api.toggleIsFavorite(marketId);
    market.isFavorite = !market.isFavorite;
    await dispatch({type: TOGGLE_IS_FAVORITE, payload: market});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getAllCategories = (search) => async (dispatch) => {
  try {
    await dispatch({type: CLEAR_ALL_MENU_ITEMS});
    const {data} = await trackPromise(api.getAllCategories(search));
    await dispatch({type: ALL_CATEGORIES_FETCHED, payload: data});
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getItemsByCategory = (categoryId, search) => async (dispatch) => {
  try {
    const {data} = await api.getItemsByCategory(categoryId, search);
    await dispatch({type: ITEMS_BY_CATEGORY_FETCHED, payload: data});
  } catch (e) {
    console.log(e);
  }
};

export const getAvailableItemsByCategory =
  (categoryId, search) => async (dispatch) => {
    try {
      const {data} = await api.getAvailableItemsByCategory(categoryId, search);
      await dispatch({type: ITEMS_BY_CATEGORY_FETCHED, payload: data});
    } catch (e) {
      console.log(e);
    }
  };

export const addToMenu = (marketId, data) => async (dispatch) => {
  try {
    const ret = await trackPromise(
      api.addItemToMenu(marketId, data),
      'add-to-menu',
    );
    await dispatch({type: ADD_ITEM_TO_MENU, payload: ret});
    dispatch(getMarketCategories(marketId));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const removeItemFromMenu = (itemId) => async (dispatch, getState) => {
  try {
    const {
      User: {me},
      Markets: {marketItems, marketCategories},
    } = getState();
    await api.removeItemFromMenu(me.market.id, itemId);
    const deletedItem = marketItems.find((item) => item.id === itemId);
    const newItems = marketItems.filter((x) => x.itemId !== itemId);
    await dispatch({
      type: REMOVE_FROM_MENU,
      payload: newItems,
    });
    if (!newItems.length) {
      const newMarketCategories = marketCategories.filter(
        (x) => x.id !== deletedItem.categoryId,
      );
      await dispatch({
        type: MARKET_CATEGORIES_FETCHED,
        payload: newMarketCategories,
      });
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateMarket = (data) => async (dispatch) => {
  try {
    const {market} = await api.updateMarket(data);
    console.log({market});
    dispatch({type: 'UPDATE_MARKET', payload: market});
  } catch (e) {
    console.log(e);
    return new Error(e);
  }
};
