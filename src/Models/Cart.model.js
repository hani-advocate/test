const findItem = (items, item) => items.find(x => x.id === item.id);
export const Cart = {
  state: {
    items: [],
    checkout: {},
  },
  reducers: {
    clearCart(state) {
      return {...state, items: [], checkout: {}};
    },
    addItem(state, item) {
      state.items.push({...item, quantity: 1});
      return {...state};
    },
    removeItem(state, payload) {
      state.items = state.items.filter(item => item.id !== payload.id);
      return {...state};
    },
    addItemQuantityBy1(state, payload) {
      const item = findItem(state.items, payload);
      item.quantity = item.quantity + 1;
      return {...state};
    },
    subtractItemQuantityBy1(state, payload) {
      const item = findItem(state.items, payload);
      item.quantity = item.quantity - 1;
      return {...state};
    },
  },
  effects: dispatch => ({
    async checkout(payload, state) {},
  }),
};
