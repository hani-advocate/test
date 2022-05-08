import {Platform, StyleSheet} from 'react-native';
import {Colors} from '@theme/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  default: {
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Medium'}),
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: wp(3.5),
    // lineHeight: hp(2.5),
    textAlign: 'center',
    color: '#828282',
  },
  header: {
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Black'}),
    fontWeight: '900',
    fontSize: wp(6),
    // lineHeight: 32,
  },
  big: {
    fontFamily: Platform.select({ios: 'Roboto-Black', android: 'Roboto-Black'}),
    fontWeight: '900',
    fontSize: hp(5),
    // lineHeight: hp(6.8),
  },
  caption: {
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Regular'}),
    fontSize: wp(4),
    // lineHeight: hp(3),
    fontWeight: 'normal',
  },
  sub: {
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Regular'}),
    fontSize: 10,
    // lineHeight: 15,
  },
  price: {
    color: Colors.pr,
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Black'}),
    fontWeight: '900',
    fontSize: 18,
    // lineHeight: 18,
  },
  bigPrice: {
    color: Colors.pr,
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Black'}),
    fontWeight: '900',
    fontSize: 24,
    // lineHeight: 28,
  },
  bold: {
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Black'}),
    fontWeight: '900',
  },
  normal: {
    fontWeight: '400',
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Medium'}),
  },
  thick: {
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Regular'}),
    fontWeight: '300',
  },
  red: {
    color: Colors.pr,
  },
  white: {
    color: Colors.bg,
  },
  grey: {
    color: Colors.grey,
  },
  black: {
    color: Colors.black,
  },
  yellow: {
    color: Colors.yellow,
  },
  smallSz: {
    fontSize: wp(3),
  },
  textLeft: {
    textAlign: 'left',
  },
  lightGrey: {
    color: Colors.lightGrey,
  },
  dark: {
    color: '#000000',
  },
});
