import React from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors, SPACE} from '@theme/theme';
import {View} from 'react-native';
import {strings} from '@root/i18n';

export const InputIcon = TextInput.Icon;

export const PaperInput = (props) => (
  <View style={{marginBottom: props.containerBottomMargin || SPACE * 1.5}}>
    <TextInput
      mode="outlined"
      theme={{
        colors: {
          primary: Colors.pr,
          background: 'white',
          underlineColor: 'blue',
        },
      }}
      selectionColor={Colors.black}
      style={{
        borderColor: Colors.black,
        fontSize: wp(3.5),
        ...props.style,
        // writingDirection: 'rtl',
      }}
      autoCapitalize={'none'}
      {...props}
    />
    {props.error && (
      <HelperText type="error" visible={true}>
        {props.helperText || strings('errors.requiredField')}
      </HelperText>
    )}
  </View>
);
