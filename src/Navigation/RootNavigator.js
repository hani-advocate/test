import React, {useEffect} from 'react';
import AuthStack from './stacks/AuthStack';
import {useSelector} from 'react-redux';
import {MainRoutes as Routes} from '@constants/Routes';
import TabNavigator from '@root/Navigation/TabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {AppState} from 'react-native';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {isAuthenticated} = useSelector(store => store.User.me);
  console.log({isAuthenticated});
  useEffect(() => {
    RNBootSplash.hide({duration: 220, fade: true});
    const listener = async state => {
      switch (state) {
        case 'active':
          return RNBootSplash.hide({duration: 220, fade: true});
        case 'background':
        case 'inactive':
          return RNBootSplash.show({duration: 220, fade: true});
      }
    };

    const listenerOnChange = AppState.addEventListener('change', listener);

    return () => {
      listenerOnChange.remove();
      // AppState.remove('change', listener);
    };
  }, []);
  return (
    <Stack.Navigator
      initialRouteName={Routes.Main}
      screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Screen name={Routes.Main} component={TabNavigator} />
      ) : (
        <Stack.Screen name={'AUTH'} component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
