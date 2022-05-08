import React from 'react';
import {View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {MarketProducts} from './market-products';
import {HomeRoutes} from '@constants/Routes';
import {strings} from '@root/i18n';
import {CommonStyles} from '@theme/styles';
import {Button, Text} from '@root/Components';
import ShopHeader from './header';

export default ({navigation}) => {
  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={[CommonStyles.content]}>
        <ShopHeader />
        <MarketProducts />
        <View>
          <Button
            style={CommonStyles.submitButtonContainer}
            onPress={() => navigation.push(HomeRoutes.AddProduct)}>
            <Text className="bold white">
              {strings('markets.addNewProduct')}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
