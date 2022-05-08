import React from 'react';
import {StyleSheet, View} from 'react-native';
import SharedFloatingHeader from '@components/Headers/sharedFloatingHeader';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CartHeader = () => {
  const headerHeight = hp(15.5);

  return (
    <View style={{height: headerHeight}}>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.1)',
          zIndex: 1,
        }}
      />
      <SharedFloatingHeader hideSearch={true} />
    </View>
  );
};

export {CartHeader};
export default CartHeader;
