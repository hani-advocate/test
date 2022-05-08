import {applyMiddleware, compose, createStore} from 'redux';

import Thunk from 'redux-thunk';
import reducers from './Reducers';

let store;

if (__DEV__) {
  const reactotron = require('../ReactotronConfig');
  const reactotronMiddleware = reactotron.default.createEnhancer();
  store = createStore(
    reducers,
    compose(applyMiddleware(Thunk), reactotronMiddleware),
  );
} else {
  store = createStore(reducers, compose(applyMiddleware(Thunk)));
}

export {store};
