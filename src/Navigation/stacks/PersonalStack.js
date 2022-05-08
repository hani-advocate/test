import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '@screens/profile';
import {NavigatorBackButton, WebViewComponent} from '@root/Components';
import ShopInfo from '@screens/shop-info';
import PersonalInfoScreen from '@screens/profile/PersonalInfo';
import Admins from '@screens/admins';
import {SubscriptionsHistory} from '@screens/subscriptions-history';
import {ProfileRoutes as Routes} from '@constants/Routes';
import {navigatorStyles} from '@theme/theme';
import {useOnTabPress} from '../utils';
import {strings} from '@root/i18n';
import {AdminsList} from '@screens/admins-List';
import PlusIcon from '@svg/+.svg';
import {navigate} from '../../../NavigationService';
import {OverviewReports} from '@screens/reports/overview-report';
import {ItemsReports} from '@screens/reports/items-report';
// import PaymentStack from '@root/Navigation/Shared/PaymentStack';

const Stack = createStackNavigator();

export default () => {
  useOnTabPress();
  return (
    <Stack.Navigator
      initialRouteName={Routes.Profile}
      screenOptions={{headerShown: false, header: null}}>
      <Stack.Screen
        name={Routes.Profile}
        component={Profile}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={Routes.PersonalInfo}
        component={PersonalInfoScreen}
        options={{
          title: strings('profile.menu.personalInfo'),
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
          title: strings('profile.menu.shopInfo'),
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={Routes.AdminsForm}
        component={Admins}
        options={{
          title: 'Admin Form',
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={Routes.AdminsList}
        component={AdminsList}
        options={{
          title: 'Assistants List',
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerRightContainerStyle: navigatorStyles.headerRightContainer,
          headerLeft: () => <NavigatorBackButton />,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate(Routes.AdminsForm)}>
              <PlusIcon />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={Routes.Subscription}
        component={SubscriptionsHistory}
        options={{
          title: strings('subscriptions.subscriptionHistory'),
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={Routes.OverviewReports}
        component={OverviewReports}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name={Routes.ItemsReports}
        component={ItemsReports}
        options={{
          title: 'Items Report',
          headerTitleStyle: navigatorStyles.headerTitle,
          headerStyle: navigatorStyles.header,
          headerLeftContainerStyle: navigatorStyles.headerLeftContainer,
          headerLeft: ({}) => <NavigatorBackButton />,
        }}
      />
      <Stack.Screen
        name={Routes.WebView}
        component={WebViewComponent}
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
