import React from 'react';
import {Text} from '@root/Components';
import {View} from 'react-native';

const LeaveMarket = () => (
  <View style={{paddingHorizontal: 16}}>
    <Text className="bigPrice black">Your cart is full</Text>
    <Text className="smallSz black">
      Going back will empty your cart and remove all items it it?
    </Text>
  </View>
);

export default LeaveMarket;
