import {Platform, StyleSheet} from 'react-native';
import {statusBarHeight} from '@theme/theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 2,
    top: Platform.select({
      ios: statusBarHeight,
      android: 12,
    }),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconStyle: {
    width: 50,
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  floatingFooter: {
    paddingHorizontal: wp(10),
    alignSelf: 'center',
    paddingVertical: wp(2.1),
    flexDirection: 'row',
    marginHorizontal: wp(10),
    position: 'absolute',
    backgroundColor: 'red',
    zIndex: 3,
    width: wp(80),
    borderRadius: 4,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowColor: 'rgba(69, 16, 17, 0.15)',
    elevation: 2,
  },
});
