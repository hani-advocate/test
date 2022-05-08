import React from 'react';
import {StyleSheet, TextInput as RNTextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Composer} from '@utils/Composer';
import {Colors} from '@theme/theme';
import propTypes from 'prop-types';
import Location from '@svg/location.svg';
import Search from '@svg/search.svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const placeholderSelector = (mode) => {
  switch (mode) {
    case 'timeline':
      return 'Find a super market ...';
    case 'market':
      return 'Milk, Eggs, Cleaners... etc';
    default:
      return 'pfff.';
  }
};

const _default = ({
  className,
  style,
  containerStyle,
  onLocationPress,
  onSearchPress,
  mode = 'timeline',
  placeholder,
  onTextChange,
  searchValue,
}) => {
  return (
    <View style={{...styles.container(mode), ...containerStyle}}>
      <TouchableOpacity
        onPress={onSearchPress}
        style={{width: 28, marginRight: 6}}>
        <Search />
      </TouchableOpacity>
      <RNTextInput
        style={StyleSheet.flatten([
          styles.default,
          Composer(className, styles),
          style,
        ])}
        value={searchValue}
        onChangeText={onTextChange}
        selectionColor={Colors.pr}
        placeholderTextColor={Colors.grey}
        placeholder={placeholder || placeholderSelector(mode)}
        returnKeyType="search"
      />
      {mode === 'timeline' && (
        <TouchableOpacity
          onPress={onLocationPress}
          style={{position: 'absolute', right: wp(3)}}>
          <Location />
        </TouchableOpacity>
      )}
    </View>
  );
};

_default.propTypes = {
  mode: propTypes.oneOf(['timeline', 'market', 'map']),
};

export {_default as SearchBar};
export default _default;
