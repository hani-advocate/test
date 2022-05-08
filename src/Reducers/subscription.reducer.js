const INITIAL_STATE = {
  form: {
    market: {},
    plan: '',
    paymentMethod: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'SET_MARKET':
      return {...state, form: {...state.form, market: payload}};
    case 'SET_PLAN':
      return {...state, form: {...state.form, plan: payload}};
    case 'SET_PAYMENT_METHOD':
      return {...state, form: {...state.form, paymentMethod: payload}};
    default:
      return state;
  }
};
