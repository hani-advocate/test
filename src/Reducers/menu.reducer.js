import {ALL_CATEGORIES_FETCHED, CLEAR_ALL_MENU_ITEMS, ITEMS_BY_CATEGORY_FETCHED} from '@types/index';

const INITIAL_STATE = {
  categories: [],
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case ALL_CATEGORIES_FETCHED:
      return {...state, categories: payload};
    case CLEAR_ALL_MENU_ITEMS:
      return {...state, items: []};
    case ITEMS_BY_CATEGORY_FETCHED:
      return {...state, items: payload};
    default:
      return state;
  }
};
