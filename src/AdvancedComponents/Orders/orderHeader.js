import React from 'react';
import {Platform, View} from 'react-native';
import {useIsShop} from '@root/Utils';
import {List} from 'react-native-paper';
import {Colors} from '@theme/theme';

export const OrderHeader = ({order}) => {
  const isShopOwner = useIsShop();
  return (
    <View style={{marginHorizontal: -16}}>
      <List.Item
        titleStyle={{
          color: Colors.black,
          fontFamily: Platform.select({
            ios: 'Roboto',
            android: 'Roboto-Bold',
          }),
          fontWeight: '900',
          fontSize: 24,
          lineHeight: 34,
        }}
        title={isShopOwner ? order?.user?.name : order?.market?.name}
        description={`${isShopOwner ? order?.user?.phoneNumber + '\n' : ''} ${
          order.address
        }`}
      />
    </View>
  );
};
