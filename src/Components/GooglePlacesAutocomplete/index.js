import React, {useRef, useState} from 'react';
import {GooglePlacesAutocomplete as AutoComplete} from 'react-native-google-places-autocomplete';
import {Colors} from '@theme/theme';
import MarketIcon from '@svg/marker.svg';
import {View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {isRTL} from '@root/i18n';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

const styles = {
  containerStyle: containerStyle => ({
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 99,
    ...containerStyle,
  }),
  textInputContainer: {
    backgroundColor: Colors.bg,
    borderRadius: 5,
    borderTopColor: Colors.black,
    borderTopWidth: 1.2,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1.2,
    borderRightColor: Colors.black,
    borderRightWidth: 1.2,
    borderLeftColor: Colors.black,
    borderLeftWidth: 1.2,
    height: hp(6.5),
    paddingTop: 0,
    paddingLeft: 5,
    // backgroundColor: 'red',
  },
  textInput: inputStyle => ({
    height: hp(4),
    paddingTop: 10,
    paddingLeft: 20,
    paddingHorizontal: 10,
    paddingRight: 0,
    marginTop: 0,
    marginRight: 0,
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
  textInputContainer = {},
  marketTopPosition = 18,
  error,
  errorText,
}) => {
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef(null);

  React.useEffect(() => {
    inputRef.current.setAddressText(defaultValue || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    // <View style={containerStyle}>
    <View style={{...styles.containerStyle(containerStyle)}}>
      <AutoComplete
        ref={inputRef}
        renderLeftButton={() =>
          isRTL ? null : (
            <MarketIcon
              style={{
                position: 'absolute',
                top: marketTopPosition,
                zIndex: 101,
                left: 10,
              }}
            />
          )
        }
        renderRightButton={() =>
          isRTL ? (
            <MarketIcon
              style={{
                position: 'absolute',
                top: marketTopPosition,
                zIndex: 101,
                right: 10,
              }}
            />
          ) : null
        }
        textInputProps={{
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
          selectionColor: Colors.black,
          ellipsizeMode: 'tail',
          numberOfLines: 1,
          style: {
            color: '#000',
            // writingDirection: isRTL ? 'rtl' : 'ltr',
            flex: 1,
            fontSize: 15,
            [isRTL ? 'paddingRight' : 'paddingLeft']: 35,
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
          key: 'AIzaSyA2YtyPMw6Oo9r2vXdzU7A0-_04FrrG80Q',
        }}
        styles={{
          listView: {
            zIndex: -1,
            width: WINDOW_WIDTH * 0.9,
          },
          container: {
            flex: 1,
          },
          textInputContainer: [
            styles.textInputContainer,
            textInputContainer,
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
          // textInput: styles.textInput(inputStyle),
        }}
      />
    </View>
  );
};

export default GooglePlacesAutocomplete;
