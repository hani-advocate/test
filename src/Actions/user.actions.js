import {
  ADDRESS_CREATED,
  FETCH_CURRENT_USER,
  SET_AUTHENTICATED,
  UPDATE_PROFILE,
} from '@types/index';

import api from '@api/User.api';
import localStorage from '@react-native-async-storage/async-storage';
import {subscriptionAPI} from '@api/subscriptions.api';

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const {user, subscription} = await api.fetchCurrentUser();
    await registerDeviceToken();
    await dispatch({type: FETCH_CURRENT_USER, payload: {user, subscription}});
    await dispatch({type: SET_AUTHENTICATED, payload: true});
    return user;
  } catch (e) {
    console.log(e);
  }
};

export const registerDeviceToken = async () => {
  const deviceId = await localStorage.getItem('deviceToken');
  if (!deviceId) {
    return;
  }
  await api.registerDevice(deviceId);
  console.log('device token registered.');
};

export const createOrUpdateAddress =
  (id, data) => async (dispatch, getState) => {
    try {
      const {
        User: {me},
      } = getState();
      const {address} = await api.createOrUpdateAddress(id, data);
      const temp = [address, ...me.addresses.filter((x) => x.id !== id)];
      await dispatch({type: ADDRESS_CREATED, payload: temp});
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

export const updateProfile = (data) => async (dispatch) => {
  try {
    const res = await api.updateProfile(data);
    await dispatch({type: UPDATE_PROFILE, payload: res});
    return true;
  } catch (e) {
    console.log(e);
    return {error: e};
  }
};

export const unreadNotificationsCount = () => async (dispatch) => {
  const {count} = await api.unreadNotificationsCount();
  await dispatch({type: 'MESSAGES_COUNT', payload: count});
};

export const userSubscribe = (params) => async (dispatch) => {
  const res = await subscriptionAPI.subscribe(params);
  await dispatch(fetchCurrentUser());
  return res;
};

export const getSubscriptionsHistory = async (params) => {
  return subscriptionAPI.getHistory();
};

export const getAssistants = async () => {
  try {
    return await api.getAssistants();
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const createAssistant = (data) => async (dispatch) => {
  try {
    console.log({data});
    await api.createAssistant(data);
    return dispatch(getAssistants());
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteAssistant = async (assistantId) => {
  try {
    await api.deleteAssistant(assistantId);
    return true;
  } catch (e) {
    throw e;
  }
};
