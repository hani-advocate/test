import React from 'react';
import {Button, Text} from '@root/Components';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 12,
    left: 28,
    right: 28,

    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowColor: 'rgba(88, 88, 183, 0.2)',
    elevation: 2,
  },
});

export const FloatingButton = ({onPress, text}) => {
  return (
    <View style={styles.btn}>
      <Button style={{marginBottom: 0}} onPress={onPress}>
        <Text className="bold white">{text}</Text>
      </Button>
    </View>
  );
};
