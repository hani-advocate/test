import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors} from '@theme/theme';
import {GooglePlacesAutocomplete as AutoComplete} from 'react-native-google-places-autocomplete';
import {strings} from '@root/i18n';
import {HelperText} from 'react-native-paper';
import MarketIcon from '@svg/marker.svg';

const styles = {
  containerStyle: containerStyle => ({
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 9,
    ...containerStyle,
  }),
  textInputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderTopColor: Colors.black,
    borderTopWidth: 1.2,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1.2,
    borderRightColor: Colors.black,
    borderRightWidth: 1.2,
    borderLeftColor: Colors.black,
    borderLeftWidth: 1.2,
    paddingTop: 0,
    paddingLeft: 5,
  },
  textInput: inputStyle => ({
    height: hp('4%'),
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 0,
    color: Colors.black,
    backgroundColor: 'red',
    ...inputStyle,
  }),
};

const GooglePlacesAutocomplete = ({
  onPick,
  placeholder,
  defaultValue,
  containerStyle = {},
  inputStyle = {},
  error,
  errorText,
}) => {
  const [isFocused, setFocused] = useState(false);
  const inputRef = useState(false);
  useEffect(() => {
    inputRef.current.setAddressText(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);
  return (
    <View style={containerStyle}>
      <MarketIcon
        style={{
          position: 'absolute',
          top: hp(1),
          zIndex: 1001,
          left: 8,
        }}
      />
      <View style={{...styles.containerStyle({})}}>
        <AutoComplete
          ref={inputRef}
          textInputProps={{
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
            selectionColor: Colors.black,
            style: {
              paddingLeft: hp('3%'),
              flex: 1,
              fontSize: 15,
              fontFamily: 'System',
            },
          }}
          placeholder={placeholder}
          debounce={300}
          enablePoweredByContainer={false}
          enableHighAccuracyLocation={true}
          fetchDetails={true}
          placeholderTextColor={Colors.grey}
          onPress={(data, details = null) => {
            onPick(data, details);
          }}
          query={{
            key: 'AIzaSyBEdoO9O40s5ee9-IO5VArXCMz9fhDchM0',
          }}
          styles={{
            textInputContainer: [
              styles.textInputContainer,
              (isFocused || error) && {
                borderWidth: 5,
                borderLeftColor: Colors.pr,
                borderRightColor: Colors.pr,
                borderTopColor: Colors.pr,
                borderBottomColor: Colors.pr,
                borderLeftWidth: 1.5,
                borderRightWidth: 1.5,
                borderTopWidth: 1.5,
                borderBottomWidth: 1.5,
              },
            ],
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            textInput: styles.textInput(inputStyle),
          }}
        />
      </View>
      {error && (
        <HelperText type="error" visible={true}>
          {errorText || strings('errors.requiredField')}
        </HelperText>
      )}
    </View>
  );
};

export default GooglePlacesAutocomplete;
