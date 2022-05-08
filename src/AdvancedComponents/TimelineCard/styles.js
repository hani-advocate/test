import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    marginBottom: 12,
    borderTopStartRadius: 6,
    borderBottomLeftRadius: 6,
    width: '100%',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowColor: 'rgba(69, 16, 17, 0.15)',
    elevation: 2,
  },
  image: {
    flex: 1,
    height: '100%',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    marginRight: 12,
  },
  content: {
    flex: 2.5,
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
