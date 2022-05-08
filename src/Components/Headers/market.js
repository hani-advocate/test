import React from 'react';
import {View} from 'react-native';
import SharedFloatingHeader from '@components/Headers/sharedFloatingHeader';
import {SCREEN_HEIGHT} from '@theme/theme';

const MarketHeader = () => {
  return (
    <View style={{height: SCREEN_HEIGHT / 5}}>
      <SharedFloatingHeader />
    </View>
  );
};
export {MarketHeader};
export default MarketHeader;
