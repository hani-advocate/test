import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export * from './colors';
export * from './styles';
export * from './icons';
export const statusBarHeight = getStatusBarHeight();
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
