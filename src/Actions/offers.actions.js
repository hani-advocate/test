import api from '@api/Offers.api';
import {subscriptionAPI} from '@root/APIs/subscriptions.api';
import {OFFERS_LIST_FETCHED, OFFERS_LIST_IS_LOADING} from '@types/index';
import {trackPromise} from 'react-promise-tracker';

export const fetchOffersList = (params) => async (dispatch) => {
  try {
    await dispatch({type: OFFERS_LIST_IS_LOADING, payload: true});
    const res = await api.getOffersList(params);
    await dispatch({type: OFFERS_LIST_FETCHED, payload: res});
    await dispatch({type: OFFERS_LIST_IS_LOADING, payload: false});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const createOrUpdateOffer = (data) => async (dispatch) => {
  try {
    await trackPromise(api.createOrUpdateOffer(data));
    if (!data.id) {
      await dispatch({type: 'OFFER_CREATED'});
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteOffer = (id) => async (dispatch) => {
  try {
    await trackPromise(api.createOrUpdateOffer(id));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPaymentIntentForOffer = (params) => {
  return subscriptionAPI.getPaymentIntent(params);
};

export const PayViaSEPA = (params) => {
  return api.PayViaSEPA(params);
};
