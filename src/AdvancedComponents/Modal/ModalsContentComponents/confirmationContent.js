import React from 'react';
import {Text} from '@root/Components';
import {View} from 'react-native';

const confirmationContent = () => {
  return (
    <View style={{paddingHorizontal: 16}}>
      <Text className="bigPrice black">Are you sure?</Text>
      <Text className="black">
        Are you sure you want to remove this item from your menu?
      </Text>
    </View>
  );
};

export default confirmationContent;
