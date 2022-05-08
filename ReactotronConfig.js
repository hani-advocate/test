import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  networking,
} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron.configure({
  name: 'Yalla Liefer',
})
  .use(reactotronRedux())
  .setAsyncStorageHandler(AsyncStorage)
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(networking())
  .connect();
console.tron = Reactotron.log;
// Extend console with tron for being able to debug to Reactotron

export default reactotron;
