import React from 'react';
import {Bubble} from 'react-native-gifted-chat';
import {StyleSheet} from 'react-native';
import {Colors} from '@theme/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGrey,
    borderRadius: 4,
    marginVertical: 2,
    width: '65%',
  },
  text: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 18,
    fontWeight: '300',
    paddingVertical: 4,
  },
  time: {
    color: Colors.grey,
    fontSize: 10,
    fontFamily: 'Roboto',
    lineHeight: 16,
  },
});

export default (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {...styles.container, backgroundColor: Colors.pr},
        left: styles.container,
      }}
      textStyle={{
        right: {...styles.text, color: Colors.white},
        left: styles.text,
      }}
      timeTextStyle={{
        right: {...styles.time, color: Colors.white},
        left: styles.time,
      }}
    />
  );
};
