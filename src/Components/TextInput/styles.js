import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    height: hp('7%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
  },
  default: {
    flex: 1,
    fontSize: wp(3.5),
    height: wp('15%'),
  },
  textarea: {
    paddingTop: 0,
    // marginTop: -8,
  },
});
