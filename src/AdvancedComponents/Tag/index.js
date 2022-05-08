import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@root/Components';
import {Colors} from '@theme/theme';

const styles = StyleSheet.create({
  container: (type) => ({
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: type === 'PRO' ? Colors.yellow : Colors.pr,
    borderRadius: 5,
  }),
});

export const Tag = ({text, type, classes = ''}) => {
  return (
    <View style={{...styles.container(type)}}>
      <Text className={`white ${classes}`}>{text}</Text>
    </View>
  );
};
