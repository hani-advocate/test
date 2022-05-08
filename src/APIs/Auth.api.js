import api from './index';

export default {
  login: (payload) => api.post('/auth/login', payload),
  resetPassword: (payload) => api.post('/auth/reset-password', payload),
  forgetPassword: (data) => api.post('/auth/forget-password', data),
  verifyCode: (data) => api.post('/auth/verify-code', data),
  verifyCodeResetPassword: (data) =>
    api.post('/auth/verify-code/reset-password', data),
  register: (payload) => api.post('/auth/signup', payload),
  checkRegisterCredentials: (payload) =>
    api.post('/auth/signup/check', payload),
};
