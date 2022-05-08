import ReactNative from 'react-native';
import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en';
import de from './locales/de';
import ar from './locales/ar';

const locales = RNLocalize.getLocales();

const currentLocale = I18n.currentLocale();
let isRTL = currentLocale.indexOf('ar') === 0;
ReactNative.I18nManager.allowRTL(isRTL);

I18n.fallbacks = true;
I18n.translations = {en, de, ar};

export const initializeI18n = async () => {
  const languageCode = await AsyncStorage.getItem('LanguagePicked');
  I18n.locale = languageCode || locales[0].languageCode;
  isRTL = I18n.locale === 'ar';
  console.log({isRTL});
  await ReactNative.I18nManager.forceRTL(isRTL);
};

export const strings = (name, params = {}) => I18n.t(name, params);
export {isRTL};
export default I18n;
