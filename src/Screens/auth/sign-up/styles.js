import {StyleSheet} from 'react-native';
import {SPACE} from '@theme/styles';

export const signupStyles = StyleSheet.create({
  container: {
    marginTop: SPACE * 1.5,
    marginBottom: SPACE * 3.2,
    alignItems: 'center',
    width: '100%',
  },
  skip: {
    position: 'absolute',
    top: 8,
    right: 12,
  },
  headerText: {
    marginBottom: 0,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  captionText: {
    width: '50%',
    textAlign: 'left',
    bottom: -12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: SPACE * 3.2,
    marginTop: SPACE * 1.5,
  },
});
