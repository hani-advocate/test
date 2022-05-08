import {
  FORGET_PASSWORD_REQUEST_SENT,
  LOGIN,
  LOGOUT,
  RESET_PASSWORD_DONE,
  UPDATE_PROFILE,
} from '@types/index';
import {removeAuthToken, setAuthToken} from '@api/index';

import api from '@api/Auth.api';

export const logIn = (credentials) => async (dispatch) => {
  try {
    const res = await api.login(credentials);
    const {user} = res;
    if (!user.isActive && user.registrationStep === 'done') {
      throw new Error("You can't login. Your account is not active");
    }
    return res;
  } catch (e) {
    throw e;
  }
};
export const register = (data) => async (dispatch) => {
  try {
    const {user} = await api.register(data);
    await dispatch({type: UPDATE_PROFILE, payload: user});
    return Promise.resolve(true);
  } catch (e) {
    console.log(e);
    return Promise.reject(false);
  }
};
export const forgetPassword = (data) => async (dispatch) => {
  try {
    await api.forgetPassword(data);
    await dispatch({type: FORGET_PASSWORD_REQUEST_SENT, payload: data.email});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const logOut = () => async (dispatch) => {
  try {
    await removeAuthToken();
    await dispatch({type: LOGOUT});
  } catch (e) {
    console.log(e);
  }
};
export const verifyCode = (params) => async (dispatch) => {
  try {
    const {user, token} = await api.verifyCode(params);
    console.log({user});
    if (params.type === 'verifyCode') {
      await setAuthToken(token);
      await dispatch({
        type: LOGIN,
        payload: {user},
      });
      return {shouldContinue: user.role !== 'customer'};
    }
    return {shouldContinue: false};
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};

export const resetPassword = (params) => async (dispatch) => {
  try {
    await api.resetPassword(params);
    await dispatch({type: RESET_PASSWORD_DONE});
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
