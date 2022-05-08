import React from 'react';
import {Text} from '@components/index';
import Cart from '@svg/illustration-cart.svg';
import {View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {strings} from '@root/i18n';

export default () => (
  <SafeAreaView>
    <View
      style={{
        paddingTop: 22,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{flex: 3}}>
        <Text style={{textAlign: 'left'}} className="header red">
          {strings('orders.shopOrdersTitle')}
        </Text>
        <Text style={{textAlign: 'left'}} className="smallSz">
          {strings('orders.shopOrdersSubtitle')}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end', marginLeft: 22}}>
        <Cart />
      </View>
    </View>
  </SafeAreaView>
);
