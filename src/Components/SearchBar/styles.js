import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: (mode) => ({
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: mode === 'timeline' ? 40 : 8,
    paddingVertical: 2,
    paddingHorizontal: hp(2),
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    marginTop: hp(1),
    shadowColor: 'rgba(88, 88, 183, 0.2)',
    elevation: 2,
  }),
  default: {
    paddingVertical: hp(0.6),
    height: hp(4),
    width: wp(100),
  },
});
