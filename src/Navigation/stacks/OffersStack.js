import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useOnTabPress} from '../utils';
import {OffersRoutes} from '@constants/Routes';
import OffersList from '@screens/offers/offers-list/offers';
import OfferForm from '@screens/offers/offers-form';
import TestScreen from '@screens/test-screen';
import {navigatorStyles} from '@theme/theme';
import {strings} from '@root/i18n';
import {NavigatorBackButton} from '@root/Components';
import {OfferPayment} from '@screens/offers/offers-list/offer-payment-method';

const Stack = createStackNavigator();

export default () => {
  useOnTabPress();
  return (
    <Stack.Navigator
      initialRouteName={OffersRoutes.OffersList}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={OffersRoutes.OffersList}
        component={OffersList}
        options={{header: () => null, unmountOnBlur: true}}
      />
      <Stack.Screen
        name={OffersRoutes.OfferForm}
        component={OfferForm}
        options={{
          title: strings('screensTitle.offerForm'),
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={OffersRoutes.OfferPayment}
        component={OfferPayment}
        options={{
          title: '',
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          header: () => null,
          // headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={'PaymentTestScreen'}
        component={TestScreen}
        options={{
          title: strings('screensTitle.offerForm'),
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
    </Stack.Navigator>
  );
};
