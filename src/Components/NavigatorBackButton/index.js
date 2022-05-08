import React from 'react';
import {goBack} from '../../../NavigationService';
import ArrowLeft from '@svg/arrow-left-red.svg';
import {TouchableOpacity} from 'react-native';
import {ICONS} from '@theme/icons';

export const NavigatorBackButton = ({onPress = undefined}) => {
  const onBack = () => {
    if (onPress) {
      onPress();
      return;
    }
    goBack();
  };

  return (
    <TouchableOpacity
      hitSlop={{left: 12, top: 12, right: 12, bottom: 12}}
      onPress={onBack}>
      {ICONS.redBackArrow()}
    </TouchableOpacity>
  );
};

export default NavigatorBackButton;
