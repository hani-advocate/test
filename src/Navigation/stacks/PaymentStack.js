import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SubscriptionPlan from '@screens/Client/Subscription/SubscriptionPlan';
import {WelcomePaymentScreen} from '@screens/Client/Subscription/WelcomePayment';
import CreditCardView from '@screens/Client/Subscription/CreditCardView';
import SEPAView from '@screens/Client/Subscription/SEPAView';
import {PaymentRoutes as Routes} from '@constants/Routes';
import {useOnTabPress} from '../utils';

const Stack = createStackNavigator();

export default () => {
  useOnTabPress();
  return (
    <Stack.Navigator
      initialRouteName={Routes.SubscriptionWelcome}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Routes.SubscriptionWelcome}
        component={WelcomePaymentScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={Routes.SubscriptionPlan}
        component={SubscriptionPlan}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={Routes.CreditCardPayment}
        component={CreditCardView}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={Routes.SEPAPayment}
        component={SEPAView}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
