import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  SubscriptionMethods,
  SubscriptionPlans,
} from '@screens/auth/subscription';
import AccountType from '@screens/auth/account-type';
import ForgetPassword from '@screens/auth/forget-password';
import Login from '@screens/auth/login';
import ShopInfo from '@screens/shop-info';
import {NavigatorBackButton, Text} from '@root/Components';
import ResetPassword from '@screens/auth/reset-password';
import {AuthRoutes as Routes, HomeRoutes} from '@constants/Routes';
import Signup from '@screens/auth/sign-up';
import VerifyCode from '@screens/auth/verify-code';
import Welcome from '@screens/auth/welcome';
import {createStackNavigator} from '@react-navigation/stack';
import {navigatorStyles} from '@theme/styles';
import {Colors} from '@theme/colors';
import {strings} from '@root/i18n';
import {store} from '@root/store';
import {updateProfile} from '@actions/index';
import {UPDATE_PROFILE} from '@types/index';
import {navigate} from '../../../NavigationService';

const Stack = createStackNavigator();

const onSkipAndFinishLater = async () => {
  try {
    await store.dispatch(updateProfile({registrationStep: 'done'}));
    await store.dispatch({
      type: UPDATE_PROFILE,
      payload: {user: {isAuthenticated: true}},
    });
    navigate(HomeRoutes.ShopHome);
  } catch (e) {
    console.log(e);
  }
};

export default () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Welcome}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Routes.Welcome}
        component={Welcome}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={Routes.Login}
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={Routes.AccountType}
        component={AccountType}
        options={{
          headerHideShadow: true,
          title: '',
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={Routes.Signup}
        component={Signup}
        options={{
          title: '',
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={Routes.SubscriptionPlans}
        component={SubscriptionPlans}
        options={{
          title: '',
          gestureEnabled: false,
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => null,
        }}
      />
      <Stack.Screen
        name={Routes.SubscriptionMethods}
        component={SubscriptionMethods}
        options={{
          title: '',
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={Routes.ShopInfo}
        component={ShopInfo}
        options={{
          title: '',
          headerTitleStyle: [navigatorStyles.headerTitle, {color: Colors.pr}],
          headerStyle: navigatorStyles.header,
          headerRightContainerStyle: navigatorStyles.headerRightContainer,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => null,
          headerRight: () => (
            <TouchableOpacity onPress={onSkipAndFinishLater}>
              <Text className="red">
                {strings('common.skipAndFinishLater')}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={Routes.ForgetPassword}
        component={ForgetPassword}
        options={{
          title: '',
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={Routes.VerifyCode}
        component={VerifyCode}
        options={{
          title: '',
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={Routes.ResetPassword}
        component={ResetPassword}
        options={{
          title: '',
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
    </Stack.Navigator>
  );
};
