import {
  ADD_TO_CART,
  CHECKOUT,
  CLEAR_CART,
  CLEAR_ORDER,
  EMPTY_CART,
  ORDER_CANCELED,
  ORDER_CREATED,
  ORDER_FETCHED_BY_ID,
  ORDER_STATUS_UPDATED,
  ORDER_UPDATED,
  ORDERS_LIST_FETCHED,
  RE_ORDER_MODE,
  REMOVE_FROM_CART,
  SET_ORDER_EDIT_MODE,
} from '@types/index';
import cloneDeep from 'lodash/cloneDeep';

const INIT_STATE = {
  cart: [],
  list: [],
  order: {},
  count: 0,
  checkout: undefined,
};

export default (state = INIT_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case ADD_TO_CART:
      return {...state, cart: payload};
    case REMOVE_FROM_CART:
      return {...state, cart: payload};
    case CLEAR_CART:
      return {...state, cart: []};
    case CHECKOUT:
      return {...state, checkout: payload};
    case ORDER_CREATED:
      return {...state, cart: []};
    case ORDER_UPDATED:
      return {...state, order: payload};
    case ORDERS_LIST_FETCHED:
      return {...state, list: payload.data, count: payload.count, order: {}};
    case ORDER_FETCHED_BY_ID:
      return {...state, order: payload};
    case SET_ORDER_EDIT_MODE: {
      const cart = payload ? cloneDeep(state.order.items) : [];
      return {...state, order: {...state.order, editMode: payload}, cart};
    }
    case ORDER_CANCELED:
      return {...state, list: payload, order: {}};
    case CLEAR_ORDER:
      return {...state, order: {}};
    case RE_ORDER_MODE: {
      const cart = payload ? cloneDeep(state.order.items) : [];
      return {...state, order: {}, cart};
    }
    case ORDER_STATUS_UPDATED:
      return {...state, order: {...state.order, status: payload}};
    case EMPTY_CART:
      return {...state, cart: []};
    default:
      return {...state};
  }
};
