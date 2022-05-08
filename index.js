import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
  require('./ReactotronConfig');
  LogBox.ignoreAllLogs(true);
}

AppRegistry.registerComponent(appName, () => App);
