import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '@components/index';
import {statusBarHeight, statusColor} from '@theme/theme';
import {useDimensions, useLayout} from '@react-native-community/hooks';

import Cancel from '@svg/x.svg';
import Arrow from '@svg/arrow-left.svg';
import {strings} from '@root/i18n';
import {useSelector} from 'react-redux';

const ChatHeader = ({navigation, arrow}) => {
  const {order} = useSelector((store) => store.Orders);
  const {currentChat: chat} = useSelector((store) => store.Chats);
  const {onLayout, height} = useLayout();
  const {height: screenHeight} = useDimensions().window;
  const headerHeight = screenHeight / 3 / 2;
  const uri = order?.makret?.coverImage || chat?.market?.coverImage;
  return (
    <View style={{height: headerHeight}}>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.1)',
          zIndex: 1,
        }}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconStyle}>
          {arrow ? <Arrow /> : <Cancel />}
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
      <ImageBackground source={{uri}} style={StyleSheet.absoluteFill} />
      <View
        onLayout={onLayout}
        style={{
          ...styles.floatingFooter(height),
          backgroundColor: statusColor(order.status),
        }}>
        <Text className="bigPrice white" style={{width: '100%'}}>
          {strings('orders.orderNumber', {orderId: order.id || chat.id || ''})}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 2,
    top: statusBarHeight + 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconStyle: {
    width: 50,
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  floatingFooter: (height) => ({
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 22,

    position: 'absolute',
    zIndex: 3,
    bottom: -(height / 2),

    borderRadius: 4,

    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowColor: 'rgba(88, 88, 183, 0.1)',
    elevation: 2,
  }),
});

export {ChatHeader};
export default ChatHeader;
