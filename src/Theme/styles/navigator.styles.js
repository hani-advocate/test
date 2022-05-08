import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../colors';
import {SPACE} from '@theme/styles/common.styles';

export const navigatorStyles = StyleSheet.create({
  headerTitle: {
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Black'}),
    fontWeight: '800',
    color: Colors.pr,
  },
  header: {
    backgroundColor: Colors.bg,
    elevation: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerLeftContainer: {
    paddingLeft: SPACE * 1.6,
  },
  headerRightContainer: {
    paddingRight: SPACE * 1.6,
  },
});
