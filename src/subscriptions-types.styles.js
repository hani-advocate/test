import {StyleSheet} from 'react-native';
import {SPACE} from '@theme/styles';
import {Colors} from '@theme/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const subscriptionsTypesStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: SPACE * 1.5,
    marginTop: SPACE * 1.5,
  },
  headerText: {
    marginBottom: 0,
  },
  boxContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  test: (isActive) => ({
    borderColor: isActive ? Colors.pr : '#F6B49E',
    borderWidth: isActive ? 2 : 1,
    borderRadius: SPACE * 0.8,
    marginBottom: SPACE * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE * 1.8,
    paddingVertical: SPACE * 2,
  }),
  box: (isActive) => ({
    borderColor: isActive ? Colors.pr : '#F6B49E',
    borderWidth: isActive ? 2 : 1,
    borderRadius: SPACE * 0.8,
    marginBottom: SPACE * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE * 1.8,
    paddingVertical: SPACE * 2,
  }),
  paymentContainer: (isSelected) => ({
    borderRadius: 10,
    borderColor: isSelected ? Colors.pr : Colors.black,
    borderWidth: isSelected ? 3 : 1,
    marginBottom: 20,
    width: '49%',
    height: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
