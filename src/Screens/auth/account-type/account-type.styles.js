import {StyleSheet} from 'react-native';
import {SPACE} from '@theme/styles';
import {Colors} from '@theme/colors';

export const accountTypeStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: SPACE,
    paddingTop: 2 * SPACE,
    // marginTop: SPACE * 1.5,
  },
  headerText: {
    marginBottom: 0,
    fontSize: SPACE * 3.5,
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
  box: (isActive) => ({
    borderColor: isActive ? Colors.pr : '#F6B49E',
    borderWidth: isActive ? 2 : 1,
    borderRadius: SPACE * 0.8,
    marginBottom: SPACE * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE * 1.8,
    paddingVertical: SPACE * 2.5,
  }),
});
