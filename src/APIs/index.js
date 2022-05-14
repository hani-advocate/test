import {API_HOST} from '@constants/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const instance = Axios.create({
  baseURL: API_HOST,
});

export const setAuthToken = async token => {
  try {
    if (!token) {
      return;
    }
    await AsyncStorage.setItem('yallaLiferUser', token);
    instance.defaults.headers.common.authorization = `bearer ${token}`;
    return Promise.resolve();
  } catch (e) {
    console.log({e});
    return Promise.reject(e);
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('yallaLiferUser');
    await AsyncStorage.removeItem('deviceToken');
    instance.defaults.headers.common.authorization = undefined;
    return Promise.resolve();
  } catch (e) {
    console.log({e});
    return Promise.reject(e);
  }
};

export const init = async () => {
  let token = await AsyncStorage.getItem('yallaLiferUser');
  const languageCode = (await AsyncStorage.getItem('LanguagePicked')) || 'en';
  if (token) {
    instance.defaults.headers.common.authorization = `bearer ${token}`;
    instance.defaults.headers.common['accept-language'] = languageCode;
  }
  return token;
};

instance.interceptors.response.use(
  res => res.data,
  err => {
    console.log({err});
    return Promise.reject(err.response.data);
  },
);

export default instance;
