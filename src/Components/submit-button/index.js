import {Text} from '../Text';
import {Button} from '../Button';
import {CommonStyles} from '@theme/styles';
import {strings} from '@root/i18n';
import {View} from 'react-native';
import React from 'react';

export const SubmitButton = ({onPress, title}) => {
  return (
    <View>
      <Button style={CommonStyles.submitButtonContainer} onPress={onPress}>
        <Text className="bold white">{strings(title)}</Text>
      </Button>
    </View>
  );
};
