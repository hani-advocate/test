import {StyleSheet} from 'react-native';

export const SPACE = 10;

export const CommonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: SPACE * 1.8,
  },
  submitButton: {
    paddingHorizontal: SPACE * 1.6,
  },
  submitButtonContainer: {
    marginBottom: SPACE * 2,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: -1,
  },
});
