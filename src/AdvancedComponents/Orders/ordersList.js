import React, {useCallback, useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {OrdersEmptyList} from './ordersEmptyList';
import {getOrders} from '@actions/orders.actions';
import {OrderListItem} from './orderListItem';
import {Spinner} from '@root/Components';
import {useFocusEffect} from '@react-navigation/native';
import {orderStatus} from '@constants/Utils';
import {CommonStyles, SPACE} from '@theme/styles';

export const Orders = ({route}) => {
  const dispatch = useDispatch();
  const {list} = useSelector((store) => store.Orders);
  const [isLoading, setIsLoading] = useState(true);
  const fetchOrdersList = useCallback(async () => {
    const filters = {};
    if (orderStatus.all.indexOf(route.name) !== -1) {
      filters.status = route.name;
    }
    await setIsLoading(true);
    await dispatch(getOrders(filters));
    await setIsLoading(false);
  }, [dispatch, route.name]);
  useFocusEffect(
    React.useCallback(() => {
      fetchOrdersList();
    }, [fetchOrdersList]),
  );
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <SafeAreaView style={[CommonStyles.safeArea]}>
      <FlatList
        ListHeaderComponentStyle={styles.header}
        ListEmptyComponent={() => <OrdersEmptyList />}
        contentContainerStyle={[CommonStyles.content, {marginTop: SPACE}]}
        data={list}
        renderItem={({item}) => <OrderListItem order={item} />}
        keyExtractor={(item, index) => `orders_list_${index}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
