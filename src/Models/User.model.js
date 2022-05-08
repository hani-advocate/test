import authAPI from '@api/Auth.api';
import userAPI from '@api/User.api';
import {removeAuthToken, setAuthToken} from '@root/APIs';

export const User = {
  state: {
    me: {},
  },
  reducers: {
    loggedIn(state, payload) {
      return {...state, me: payload};
    },
    logout(state) {
      removeAuthToken();
      return {...state, me: {}};
    },
    storeVerifyCode(state, verifyCode) {
      return {state, verifyCode};
    },
    storeUser(state, payload) {
      return {...state, me: payload};
    },
  },
  effects: dispatch => ({
    async loginAction(payload, state) {
      try {
        const {user, token} = await authAPI.login(payload);
        await setAuthToken(user, token);
        dispatch.User.loggedIn(user);
      } catch (e) {
        console.log(e);
      }
    },
    async registerAction(payload, state) {
      try {
        const {user, token} = await authAPI.register(payload);
        await setAuthToken(user, token);
        dispatch.User.storeUser(user);
      } catch (e) {
        console.log(e);
      }
    },
    async forgetPasswordAction(payload) {
      try {
        const {verifyCode} = await authAPI.forgetPassword(payload);
        dispatch.User.storeVerifyCode(verifyCode);
      } catch (e) {
        console.log(e);
      }
    },
    async resetPasswordAction(payload, state) {
      try {
        await authAPI.resetPassword({verifyCode: state.verifyCode, ...payload});
      } catch (e) {
        console.log(e);
      }
    },
    async changePasswordAction(payload) {
      try {
        await userAPI.changePassword(payload);
      } catch (e) {
        console.log(e);
      }
    },
  }),
};
