import React from 'react';
import {Text} from '@root/Components';
import {View} from 'react-native';

const FailedOrder = () => (
  <View style={{paddingHorizontal: 16}}>
    <Text className="bigPrice black">You haven't sent the order!</Text>
    <Text className="smallSz black">
      Going back will cancel your order and remove all items from your cart?
    </Text>
  </View>
);

export default FailedOrder;
