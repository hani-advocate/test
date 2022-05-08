import React from 'react';
import {WebView} from 'react-native-webview';

const WebViewComponent = ({route}) => {
  const {uri = 'http://www.google.com'} = route;
  return <WebView source={{uri}} />;
};

export default WebViewComponent;
