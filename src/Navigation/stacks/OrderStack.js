import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Orders from '@screens/orders/orders-list';
import Order from '@screens/orders/order-details';

import {OrderRoutes as Routes} from '@constants/Routes';

import OrderHeader from '@components/Headers/Order';
import OrdersHeader from '@components/Headers/shop-orders-header';
import {useOnTabPress} from '../utils';

const Stack = createStackNavigator();

export default () => {
  useOnTabPress();
  return (
    <Stack.Navigator
      initialRouteName={Routes.Orders}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.Orders} component={Orders} />
      <Stack.Screen
        name={Routes.Order}
        component={Order}
        initialParams={{
          status: 'Waiting',
        }}
        options={({navigation, route}) => ({
          header: props => <OrderHeader {...props} {...{route}} />,
        })}
      />
    </Stack.Navigator>
  );
};
