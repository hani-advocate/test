import HomeStackShop from './stacks/HomeStack';
import MessagesStack from './stacks/MessagesStack';
import OffersStack from './stacks/OffersStack';
import OrderStack from './stacks/OrderStack';
import PersonalStack from './stacks/PersonalStack';
import React from 'react';
import {BottomTabsRoutes as Routes} from '@constants/Routes';
import TabIcon from '@components/TabIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Colors} from '@theme/colors';

const Tab = createBottomTabNavigator();

const hiddenTabBar = route => {
  const hideOnScreens = [
    'AddProduct_Screen',
    'OfferForm_Screen',
    'Personal_Info_Screen',
    'ShopInfo_Screen',
    'WebView_Screen',
    'Order_Screen',
    'Chat_Screen',
  ];
  const routeName = getFocusedRouteNameFromRoute(route);
  return hideOnScreens.indexOf(routeName) <= -1;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.Home}
      backBehavior="history"
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        style: {
          // Remove border top on both android & ios
          borderTopWidth: 0,
          borderTopColor: Colors.pr,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          backgroundColor: Colors.white,
          shadowRadius: 0,
        },
      }}
      screenOptions={({route}) => ({
        tabBarVisible: hiddenTabBar(route),
        headerShown: false,
        tabBarIcon: ({focused, size}) => (
          <TabIcon {...{focused, size, route}} />
        ),
      })}>
      <Tab.Screen name={Routes.Orders} component={OrderStack} />
      <Tab.Screen name={Routes.Messages} component={MessagesStack} />
      <Tab.Screen name={Routes.Home} component={HomeStackShop} />
      <Tab.Screen name={Routes.SpecialOffers} component={OffersStack} />
      <Tab.Screen name={Routes.Personal} component={PersonalStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
