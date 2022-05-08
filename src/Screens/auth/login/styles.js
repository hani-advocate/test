import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('3%'),
    paddingRight: wp('7%'),
    paddingLeft: wp('7%'),
    alignItems: 'center',
  },
  skip: {
    position: 'absolute',
    top: 8,
    right: 12,
  },
  headerText: {
    marginBottom: hp('7%'),
  },
  paperInput: {
    fontSize: wp(3.5),
    marginBottom: hp(3),
  },
});
