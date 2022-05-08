import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChatList from '@screens/messages/chat-list';
import Chat from '@screens/messages/chat';

import {MessagesRoutes as Routes} from '@constants/Routes';

import ChatHeader from '@components/Headers/chat-header';
import {useOnTabPress} from '../utils';

const Stack = createStackNavigator();

export default () => {
  useOnTabPress();
  return (
    <Stack.Navigator
      initialRouteName={Routes.ChatList}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Routes.ChatList}
        component={ChatList}
        options={{header: () => null, unmountOnBlur: true}}
      />
      <Stack.Screen
        name={Routes.Chat}
        component={Chat}
        options={() => ({
          header: props => <ChatHeader {...props} />,
        })}
      />
    </Stack.Navigator>
  );
};
