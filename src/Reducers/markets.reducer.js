import {
  ADD_ITEM_TO_MENU,
  MARKET_CATEGORIES_FETCHED,
  MARKET_FETCHED,
  MARKET_ITEMS_FETCHED,
  MARKET_ITEMS_FILTER_FETCHED,
  MARKETS_LIST_FETCHED,
  NAVIGATE_TO_MARKET,
  RE_ORDER_MODE,
  REMOVE_FROM_MENU,
  TOGGLE_IS_FAVORITE,
} from '@types/index';

const INIT_STATE = {
  list: [],
  count: 0,
  market: {},
  marketCategories: [],
  marketItems: [],
  currentCategoryTab: undefined,
  hideCategoriesFilter: false,
};

export default (state = INIT_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case MARKETS_LIST_FETCHED:
      return {
        ...state,
        count: payload.count,
        list: [...payload.data],
      };
    case NAVIGATE_TO_MARKET:
    case TOGGLE_IS_FAVORITE:
      return {...state, market: payload};
    case MARKET_FETCHED:
      return {...state, market: payload};
    case MARKET_CATEGORIES_FETCHED:
      return {...state, marketCategories: payload};
    case MARKET_ITEMS_FETCHED:
    case REMOVE_FROM_MENU:
      return {...state, marketItems: payload};
    case RE_ORDER_MODE:
      return {...state, market: payload.market};
    case ADD_ITEM_TO_MENU:
      const items = state.marketItems;
      const idx = items.findIndex((x) => x.id === payload.itemId);
      if (idx > -1) {
        state.marketItems[idx].price = payload.price;
      }
      return {...state, marketCategories: []};
    case MARKET_ITEMS_FILTER_FETCHED:
      return {...state, marketItems: payload};
    case 'SET_CURRENT_CATEGORY_TYPE':
      return {...state, currentCategoryTab: payload};
    case 'HIDE_CATEGORIES_FILTER': {
      return {...state, hideCategoriesFilter: payload};
    }
    default:
      return {...state};
  }
};
