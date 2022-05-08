import React from 'react';
import {Colors, statusColor} from '@theme/theme';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@root/Components';
import moment from 'moment';
import {strings} from '@root/i18n';
import {useNavigation} from '@react-navigation/native';
import {OrderRoutes} from '@constants/Routes';
import {useIsShop} from '@root/Utils';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const OrderListItem = ({order}) => {
  const color = statusColor(order.status);
  const isShopOwner = useIsShop();
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate(OrderRoutes.Order, {orderId: order.id});
  };
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={onPress}>
      <View style={{...styles.status, backgroundColor: color}} />
      <View style={styles.itemContent}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'space-between',
          }}>
          <Text className="normal bold black textLeft">
            {isShopOwner ? order.user.name : order?.market?.name}
          </Text>
          <Text className="bold red" style={{fontSize: 18}}>
            {'€' + order.total}
          </Text>
        </View>
        <View style={styles.itemFooter}>
          <Text className="bold" style={{color}}>
            {strings(`orders.status.${order.status}`)}
          </Text>
          <Text className="smallSz black">
            {moment(order.createdAt).format('D, MMM hh:mmA')}
          </Text>
          <Text className="smallSz black">
            {strings('orders.orderNumber', {orderId: order.id})}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    // height: hp(10.1),
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 4,
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: {
      height: 6,
      width: 3,
    },
    shadowColor: 'rgba(69, 16, 17, 0.15)',
    elevation: 2,
  },
  status: {
    width: wp(3),
    backgroundColor: Colors.grey,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  itemContent: {
    paddingHorizontal: wp(3),
    paddingTop: hp(1),
    paddingBottom: hp(1),
    flex: 1,
  },
  itemFooter: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
});
