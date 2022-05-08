import React from 'react';
import {View} from 'react-native';
import Empty from '@svg/empty-orders.svg';
import {Button, Text} from '@root/Components';
import {strings} from '@root/i18n';
import {useIsShop} from '@root/Utils';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@theme/theme';
import {useNavigation} from '@react-navigation/native';
import {HomeRoutes} from '@constants/Routes';

export const OrdersEmptyList = () => {
  const isShopOwner = useIsShop();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}>
      <View
        style={{
          flex: 1,
          height: SCREEN_HEIGHT / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Empty />
          <Text className="bold red" style={{width: SCREEN_WIDTH / 1.8}}>
            {strings('orders.listHeaderText')}
          </Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        {!isShopOwner && (
          <Button
            onPress={() => {
              navigation.navigate(HomeRoutes.Timeline);
            }}>
            <Text className="bold white">
              {strings('orders.btn.startShopping')}
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
};
