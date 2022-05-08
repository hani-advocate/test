import moment from 'moment';
import {Dimensions, PixelRatio, Platform} from 'react-native';

export const isInCart = (cart, item) => cart.find((x) => x.id === item.id);
export const cartSubtotal = (cart) =>
  parseFloat(
    cart.reduce((acc, curr) => curr.price * curr.quantity + acc, 0),
  ).toFixed(2);
export const truncateString = (str, num = 80) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};
export const getDeliveryTime = (time) => moment(time, 'hh:mm').format('hh:mmA');
export const Platforms = {
  ANDROID: 'android',
  IOS: 'ios',
};

export const orderStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'inProgress',
  DONE: 'done',
  CANCELED: 'canceled',
};
orderStatus.all = Object.values(orderStatus);

export const orderStatusLabel = {
  pending: 'Waiting',
  inProgress: 'Accepted',
  done: 'Delivered',
  canceled: 'rejected',
};

export const modalActionTypes = {
  SHOW: 'show',
  HIDE: 'hide',
  SET: 'set',
};

export const modalModes = {
  SUCCESS: 'success',
  FAILED: 'failed',
  RATE: 'rate',
  LOGIN: 'login',
  MESSAGE: 'message',
  LEAVE_MARKET: 'leaveMarket',
  CONFIRMATION: 'confirmation',
  CHANGE_ROLE: 'changeRole',
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
