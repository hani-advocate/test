import {StyleSheet} from 'react-native';
import {Colors} from '@theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingLeft: 24,
    paddingRight: 28,
    paddingVertical: 22,
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    borderColor: Colors.pr,
    borderWidth: 3,
  },
  content: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 14,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  item: {
    paddingRight: 14,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    paddingTop: 9,
    backgroundColor: 'white',
    marginBottom: 6,
  },
});
