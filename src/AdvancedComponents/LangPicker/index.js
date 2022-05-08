import React, {useEffect, useState} from 'react';
import ReactNative, {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '@root/Components';
import World from '@svg/world.svg';
import EngActive from '@svg/eng-active.svg';
import EngInActive from '@svg/eng-inactive.svg';
import GermActive from '@svg/germ-active.svg';
import GermInActive from '@svg/germ-inactive.svg';
import ArActive from '@svg/ar-active.svg';
import ArInActive from '@svg/ar-inactive.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {List} from 'react-native-paper';
import {Colors} from '@theme/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {isRTL, strings} from '@root/i18n';

const styles = StyleSheet.create({
  langs: {
    paddingLeft: 18,
    paddingRight: 14,
    paddingBottom: 4,
    paddingTop: 4,
    backgroundColor: 'white',
    marginBottom: 6,
  },
  lang: {
    marginVertical: 14,
    flexDirection: 'row',
  },
});

const LANGUAGES = [
  {
    label: 'English',
    languageCode: 'en',
    activeIcon: <EngActive />,
    inactiveIcon: <EngInActive />,
  },
  {
    label: 'Germany',
    languageCode: 'de',
    activeIcon: <GermActive />,
    inactiveIcon: <GermInActive />,
  },
  {
    label: 'Arabic',
    languageCode: 'ar',
    activeIcon: <ArActive />,
    inactiveIcon: <ArInActive />,
  },
];

export const LangPicker = ({}) => {
  const [selected, set] = useState(0);
  const getLanguage = async () => {
    const languageCode = (await AsyncStorage.getItem('LanguagePicked')) || 'en';
    set(languageCode);
  };
  useEffect(() => {
    getLanguage();
  }, []);

  const Language = ({lang}) => {
    const isActive = selected === lang.languageCode;
    const onSelect = async () => {
      set(lang.languageCode);
      await AsyncStorage.setItem('LanguagePicked', lang.languageCode);
      if (lang.languageCode === 'ar') {
        await ReactNative.I18nManager.forceRTL(isRTL);
      }
      RNRestart.Restart();
    };

    return (
      <TouchableOpacity onPress={onSelect} style={styles.lang}>
        {isActive ? lang.activeIcon : lang.inactiveIcon}
        <Text
          style={{marginLeft: 12}}
          className={`bold black ${isActive ? 'black' : 'lightGrey'}`}>
          {lang.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <List.Accordion
      title={strings('profile.menu.language')}
      titleStyle={{
        fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Black'}),
        fontWeight: '900',
        color: Colors.black,
        fontSize: wp(3.5),
        lineHeight: hp(2.5),
        paddingLeft: 8,
      }}
      description={strings('profile.menu.languageSubtitle')}
      descriptionStyle={{
        fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Medium'}),
        color: Colors.grey,
        fontWeight: '500',
        fontSize: wp(3),
        textAlign: 'left',
        paddingLeft: 8,
      }}
      left={() => <World />}
      style={styles.langs}>
      <View
        style={{paddingLeft: 24, backgroundColor: 'white', marginBottom: 8}}>
        {LANGUAGES.map((lang, index) => (
          <Language key={`${index}_lang`} index={index} lang={lang} />
        ))}
      </View>
    </List.Accordion>
  );
};
