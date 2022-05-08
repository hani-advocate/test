import React from 'react';
import {useDimensions} from '@react-native-community/hooks';
import {View} from 'react-native';
import {Colors, statusBarHeight} from '@theme/theme';
import {Text} from '@root/Components';

const getColor = toast => {
  switch (toast.type) {
    case 'success':
      return Colors.green;
    case 'error':
      return Colors.pr;
    case 'info':
      return Colors.yellow;
    default:
      return Colors.pr;
  }
};

const Toast = ({toast}) => {
  const {height} = useDimensions().window;

  return (
    <View
      style={{
        backgroundColor: getColor(toast),
        borderRadius: 6,
        alignSelf: 'flex-start',
        width: '100%',
        paddingVertical: 16,
        top: -(height / 2) + statusBarHeight + 50,
      }}>
      <Text className="bold white">{toast.message}</Text>
    </View>
  );
};
export default Toast;
