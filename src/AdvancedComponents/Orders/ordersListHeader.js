import React from 'react';
import {View} from 'react-native';
import {Text} from '@root/Components';
import Cart from '@svg/illustration-cart.svg';
import {strings} from '@root/i18n';

export const OrdersListHeader = () => (
  <View
    style={{
      paddingBottom: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 18,
      paddingTop: 65,
    }}>
    <View style={{flex: 3}}>
      <Text style={{textAlign: 'left'}} className="header red">
        {strings('orders.listHeaderTitle')}
      </Text>
      <Text style={{textAlign: 'left'}} className="smallSz">
        {strings('orders.listHeaderText')}
      </Text>
    </View>
    <View style={{flex: 1, alignItems: 'flex-end'}}>
      <Cart />
    </View>
  </View>
);
