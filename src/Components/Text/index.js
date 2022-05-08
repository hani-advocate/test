import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import styles from './styles';
import {Composer} from '@utils/Composer';
import propTypes from 'prop-types';

const _default = ({style, children, className, ...rest}) => {
  return (
    <RNText
      style={StyleSheet.flatten([
        styles.default,
        Composer(className, styles),
        style,
      ])}
      {...rest}>
      {children}
    </RNText>
  );
};

_default.propTypes = {
  style: RNText.propTypes.style,
  children: propTypes.oneOfType([propTypes.string, propTypes.node]),
  className: propTypes.string,
};

export {_default as Text};
export default _default;
