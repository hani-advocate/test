import {combineReducers} from 'redux';
import User from './user.reducer';
import Markets from './markets.reducer';
import Orders from './orders.reducer';
import Offers from './offers.reducer';
import Chats from './chats.reducer';
import Menu from './menu.reducer';
import Snackbar from './snackbar.reducer';
import Subscription from './subscription.reducer';

export default combineReducers({
  User,
  Markets,
  Orders,
  Offers,
  Chats,
  Menu,
  Subscription,
  Snackbar,
});
