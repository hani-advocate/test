import AddProduct from '@screens/add-product';
import {navigatorStyles} from '@theme/theme';
import React from 'react';
import {HomeRoutes as Routes} from '@constants/Routes';
import ShopHome from '@screens/market';
import {createStackNavigator} from '@react-navigation/stack';
import {strings} from '@root/i18n';
import {useOnTabPress} from '../utils';
import {NavigatorBackButton} from '@root/Components';

const Stack = createStackNavigator();

export default () => {
  useOnTabPress();
  return (
    <Stack.Navigator
      initialRouteName={Routes.ShopHome}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.ShopHome} component={ShopHome} />
      <Stack.Screen
        name={Routes.AddProduct}
        component={AddProduct}
        options={{
          headerShown: true,
          title: strings('menu.addProductTitle'),
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: [navigatorStyles.header, {paddingHeorizontal: 20}],
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
    </Stack.Navigator>
  );
};
