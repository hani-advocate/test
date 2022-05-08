import React, {useState} from 'react';
import {StyleSheet, TextInput as RNTextInput, View} from 'react-native';
import styles from './styles';
import {Text} from '@components/Text';
import {Composer} from '@utils/Composer';
import {Colors} from '@theme/theme';
import Info from '@svg/info-red.svg';
import propTypes from 'prop-types';
import {strings} from '@root/i18n';

const _default = ({
  wrong,
  errorLabel,
  className,
  style,
  containerStyle,
  Left,
  Right,
  ref,
  onChangeText,
  rightIconStyle,
  value,
  label,
  isRequired,
  ...rest
}) => {
  const [focused, set] = useState(false);

  let extraStyles = {};
  if (wrong) {
    extraStyles = {
      borderColor: Colors.pr,
      borderWidth: 2.4,
    };
  }
  if (focused) {
    extraStyles = {
      borderColor: Colors.yellow,
      borderWidth: 2.4,
    };
  }

  return (
    <View style={{marginBottom: 20}}>
      {label && (
        <Text className={'textLeft small thick black'}>
          {label}
          {isRequired && <Text className={'red'}>{' *'}</Text>}
        </Text>
      )}
      <View
        style={{
          ...styles.container,
          ...extraStyles,
          ...containerStyle,
        }}>
        {Left && (
          <View
            style={{
              width: 28,
              marginRight: 6,
              ...rightIconStyle,
            }}>
            <Left />
          </View>
        )}
        <RNTextInput
          style={StyleSheet.flatten([
            styles.default,
            Composer(className, styles),
            style,
          ])}
          focus
          onFocus={() => set(true)}
          onEndEditing={() => set(false)}
          ref={ref}
          autoCapitalize="none"
          onChangeText={onChangeText}
          selectionColor={Colors.pr}
          placeholderTextColor={Colors.grey}
          value={value}
          {...rest}
        />
        {wrong && !focused && (
          <View style={{width: 28, marginLeft: 8}}>
            <Info />
          </View>
        )}
        {Right && (
          <View style={{width: 28, marginLeft: 8}}>
            <Right />
          </View>
        )}
      </View>
      {wrong && (
        <Text className={'red textLeft'}>
          {errorLabel || strings('common.errors.required')}
        </Text>
      )}
    </View>
  );
};

_default.propTypes = {
  className: propTypes.string,
};

export {_default as Text};
export default _default;
