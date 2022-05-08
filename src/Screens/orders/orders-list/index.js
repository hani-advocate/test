import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {CommonStyles} from '@theme/theme';
import {OrderStatusFilter} from './orders-status-filter';
import {OrdersList} from './orders-list';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from '@actions/index';
import {useFocusEffect} from '@react-navigation/native';
import OrdersHeader from '@components/Headers/shop-orders-header';

const ORDER_STATUS = ['pending', 'inProgress', 'done', 'canceled'];

export default () => {
  const dispatch = useDispatch();
  const [activeStatus, setActiveStatus] = useState(ORDER_STATUS[0]);
  const {list: orders} = useSelector(store => store.Orders);

  const fetchOrders = useCallback(async () => {
    await dispatch(getOrders({status: activeStatus}));
  }, [activeStatus, dispatch]);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [fetchOrders]),
  );

  useEffect(() => {
    fetchOrders();
  }, [activeStatus, fetchOrders]);

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={[CommonStyles.content]}>
        <OrdersHeader />
        <OrderStatusFilter
          onPress={setActiveStatus}
          activeStatus={activeStatus}
          statuses={ORDER_STATUS}
        />
        <OrdersList orders={orders} />
      </View>
    </SafeAreaView>
  );
};
