import moment from 'moment';

export const defaultMarket = {
  name: '',
  logoImage: null,
  coverImage: null,
  location: null,
  address: '',
  lat: null,
  lng: null,
  phoneNumber: '',
  minimumOrderCost: '',
  deliveryCost: '',
  maxDeliveryRadius: '',
  startDeliveryTime: moment(),
  endDeliveryTime: moment().add(4, 'hours'),
};
