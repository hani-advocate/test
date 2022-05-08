import {OFFERS_LIST_FETCHED, OFFERS_LIST_IS_LOADING} from '@types/index';

const INITIAL_STATE = {
  list: [],
  count: 0,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case OFFERS_LIST_FETCHED:
      return {...state, list: payload.data, count: payload.count};
    case OFFERS_LIST_IS_LOADING:
      return {...state, isLoading: payload};
    default:
      return {...state};
  }
};
