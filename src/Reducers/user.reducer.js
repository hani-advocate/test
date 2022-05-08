import {
  ADDRESS_CREATED,
  FETCH_CURRENT_USER,
  FORGET_PASSWORD_REQUEST_SENT,
  LOGIN,
  LOGOUT,
  REGISTER,
  RESET_PASSWORD_DONE,
  UPDATE_PROFILE,
  VERIFY_CODE_CORRECT,
  SET_AUTHENTICATED
} from '@types/index';

const INIT_STATE = {
  me: {
    isAuthenticated: false,
  },
  subscription: {},
  verificationCode: undefined,
  resetEmail: undefined,
  isShop: false,
  searchedAddress: {
    address: '',
    location: {
      lat: 0,
      lng: 0,
    },
  },
};

export default (state = INIT_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN:
    case FETCH_CURRENT_USER:
      return {
        ...state,
        me: payload.user,
        subscription: payload.subscription || {},
      };
    case SET_AUTHENTICATED: {
      return {
        ...state,
        me: {
          ...state.me,
          isAuthenticated: payload,
        },
      };
    }
    case FORGET_PASSWORD_REQUEST_SENT:
      return {...state, resetEmail: payload};
    case VERIFY_CODE_CORRECT:
      return {...state, verificationCode: payload};
    case RESET_PASSWORD_DONE:
      return {...state, verificationCode: undefined, resetEmail: undefined};
    case ADDRESS_CREATED:
      return {...state, me: {...state.me, addresses: payload}};
    case LOGOUT:
      console.log('logout');
      return {...state, me: {isAuthenticated: false}, subscription: {}};
    case 'UPDATE_MARKET':
      return {
        ...state,
        me: {...state.me, market: Object.assign(state.me.market, payload)},
      };
    case REGISTER:
    case UPDATE_PROFILE:
      return {
        ...state,
        me: Object.assign(state.me, payload.user),
      };
    case 'SET_ADDRESS':
      return {...state, searchedAddress: payload};

    case 'OFFER_CREATED':
      return {
        ...state,
        subscription: {
          ...state.subscription,
          currentOffers: state.subscription.currentOffers + 1,
        },
      };
    default:
      return {...state};
  }
};
