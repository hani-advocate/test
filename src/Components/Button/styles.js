import {StyleSheet} from 'react-native';
import {Colors} from '@theme/theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  default: {
    backgroundColor: Colors.pr,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(4),
    marginBottom: 28,
    width: '100%',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowColor: 'rgba(88, 88, 183, 0.2)',
    elevation: 1,
  },
  outline: {
    backgroundColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(4),
    marginBottom: 28,
    width: '100%',
    borderColor: Colors.pr,
    borderWidth: 1,
  },
  text: {
    backgroundColor: 'transparent',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 28,
    width: '100%',
  },
  white: {
    backgroundColor: 'white',
  },
  disabled: {
    backgroundColor: Colors.lightGrey,
    color: Colors.white,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(4),
    marginBottom: 28,
    width: '100%',
  },
});
