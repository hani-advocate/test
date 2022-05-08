import React from 'react';
import {Text} from '@root/Components';
import {View} from 'react-native';

const login = () => (
  <View style={{paddingHorizontal: 16}}>
    <Text className="bigPrice black">You are not logged in yet</Text>
    <Text className="smallSz black">
      Create an account and enjoy shopping for home!
    </Text>
  </View>
);

export default login;
