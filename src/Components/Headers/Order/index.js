import React from 'react';
import {ImageBackground, StatusBar, StyleSheet, View} from 'react-native';
import {Text} from '@root/Components';
import {styles} from './styles';
import {useLayout} from '@react-native-community/hooks';
import {statusColor} from '@theme/theme';
import {useSelector} from 'react-redux';
import {LeftOrderDetailsHeader, RightOrderDetailsHeader} from './components';
import isEmpty from 'lodash/isEmpty';
import {strings} from '@root/i18n';
import {orderStatus} from '@constants/Utils';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const OrderHeader = ({}) => {
  const {order} = useSelector((store) => store.Orders);
  const {onLayout, height} = useLayout();
  const headerHeight = hp(19.5);

  if (isEmpty(order)) {
    return null;
  }
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
        <LeftOrderDetailsHeader />
        <RightOrderDetailsHeader />
      </View>
      <ImageBackground
        source={{uri: order?.market?.coverImage}}
        style={StyleSheet.absoluteFill}
      />
      <View
        onLayout={onLayout}
        style={{
          ...styles.floatingFooter,
          bottom: -(height / 2),
          backgroundColor: statusColor(
            order.editMode ? orderStatus.CANCELED : order.status,
          ),
        }}>
        <Text className="bigPrice white" style={{width: '100%'}}>
          {strings('orders.orderNumber', {orderId: order.id})}
        </Text>
      </View>
    </View>
  );
};

export {OrderHeader};
export default OrderHeader;
