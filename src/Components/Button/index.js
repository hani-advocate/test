import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Composer} from '@utils/Composer';

const _default = ({children, style, onPress, className, mode = 'default'}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={StyleSheet.flatten([
        styles[mode],
        Composer(className, styles),
        style,
      ])}
      disabled={mode === 'disabled'}
      activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
};

export {_default as Button};
export default _default;
