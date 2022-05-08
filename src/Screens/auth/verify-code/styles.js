import {StyleSheet} from 'react-native';
import {SPACE} from '@theme/styles';

export const VerificationCodeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingRight: 28,
    paddingLeft: 28,
    alignItems: 'center',
  },
  skip: {
    position: 'absolute',
    top: 8,
    left: 12,
  },
  headerText: {
    marginBottom: SPACE * 3,
  },
});
