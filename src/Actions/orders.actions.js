import api from '@api/Orders.api';
import {
  ADD_TO_CART,
  CHANGE_ITEM_QUANTITY,
  CHECKOUT,
  EMPTY_CART,
  MARKET_RATED,
  ORDER_CANCELED,
  ORDER_CREATED,
  ORDER_FETCHED_BY_ID,
  ORDER_STATUS_UPDATED,
  ORDER_UPDATED,
  ORDERS_LIST_FETCHED,
} from '@types/index';
import {orderStatus} from '@constants/Utils';

const getCartItem = (cart, item) => cart.find((x) => x.id === item.id);

export const addItemToCart = (item, quantity = 1) => async (
  dispatch,
  getState,
) => {
  try {
    const {
      Orders: {cart},
    } = getState();
    const cartItem = getCartItem(cart, item);
    if (!cartItem) {
      cart.push({...item, quantity: quantity});
    }
    await dispatch({type: ADD_TO_CART, payload: cart});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const removeItemFromCart = (item) => async (dispatch, getState) => {
  console.log('esadadad');
  try {
    const {
      Orders: {cart},
    } = getState();
    await dispatch({
      type: ADD_TO_CART,
      payload: cart.filter((x) => x.id !== item.id),
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const changeItemQuantity = (item, quantity) => async (
  dispatch,
  getState,
) => {
  try {
    const {
      Orders: {cart},
    } = getState();
    const cartItem = getCartItem(cart, item);
    if (cartItem) {
      cartItem.quantity += quantity;
      dispatch({type: CHANGE_ITEM_QUANTITY, payload: cart});
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const checkout = (data) => async (dispatch) => {
  try {
    const res = await api.checkout(data);
    await dispatch({type: CHECKOUT, payload: res});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const createOrder = (data) => async (dispatch) => {
  try {
    await api.createOrder(data);
    await dispatch({type: ORDER_CREATED});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateOrder = (orderId, data) => async (dispatch) => {
  try {
    const order = await api.updateOrder(orderId, data);
    await dispatch({type: ORDER_UPDATED, payload: order});
  } catch (e) {
    console.log(e);
  }
};

export const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    let {
      Orders: {list},
    } = getState();
    await api.changeOrderStatus(orderId, orderStatus.CANCELED);
    list = list.filter((x) => x.id !== orderId);
    await dispatch({type: ORDER_CANCELED, payload: list});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getOrders = (filters) => async (dispatch) => {
  try {
    const res = await api.getOrders(filters);
    await dispatch({type: ORDERS_LIST_FETCHED, payload: res});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchOrderDetails = (orderId) => async (dispatch) => {
  try {
    const order = await api.getOrderById(orderId);
    await dispatch({type: ORDER_FETCHED_BY_ID, payload: order});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const rateOrder = (marketId, rate) => async (dispatch) => {
  try {
    await api.rateOrder(marketId, rate);
    await dispatch({type: MARKET_RATED});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const acceptOrder = (orderId) => async (dispatch) => {
  try {
    await api.changeOrderStatus(orderId, orderStatus.IN_PROGRESS);
    await dispatch({
      type: ORDER_STATUS_UPDATED,
      payload: orderStatus.IN_PROGRESS,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  try {
    await api.changeOrderStatus(orderId, orderStatus.DONE);
    await dispatch({
      type: ORDER_STATUS_UPDATED,
      payload: orderStatus.DONE,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const emptyCart = () => async (dispatch) => {
  try {
    await dispatch({type: EMPTY_CART});
    return true;
  } catch (e) {
    console.log(e);
    return true;
  }
};
