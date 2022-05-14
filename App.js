import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Snackbar, Text, View} from '@components/index';
import {YallaModal as Modal} from '@advanced/index';
import {Colors} from '@theme/theme';
import IsAuthenticated from '@components/IsAuthenticated';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import RootNavigator from './src/Navigation/RootNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {enableScreens} from 'react-native-screens';
import {initializeI18n} from '@root/i18n';
// import socket from '@constants/Utils/socket.io';
import {navigationRef} from './NavigationService';
import {store} from './src/store';
import {initializeOneSignal} from '@root/OneSignalContainer';

// enableScreens();

const Theme = {
  // https://reactnavigation.org/docs/themes
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.bg,
    primary: Colors.pr,
    error: Colors.pr,
  },
  // fonts: configureFonts(fontConfig),
};

const App = () => {
  useEffect(() => {
    initializeOneSignal(store);
    // socket.initialize(store.dispatch);
    initializeI18n();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={Theme}>
        <IsAuthenticated>
          <SafeAreaProvider style={{flex: 1}}>
            <NavigationContainer theme={Theme} ref={navigationRef}>
              <Modal>
                <RootNavigator />
                <Snackbar />
              </Modal>
            </NavigationContainer>
          </SafeAreaProvider>
        </IsAuthenticated>
      </PaperProvider>
    </Provider>
  );
};

export default App;
