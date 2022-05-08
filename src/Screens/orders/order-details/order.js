import React, {useCallback, useEffect} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {FlatList, StyleSheet, View} from 'react-native';
import {Spinner} from '@root/Components';
import {OrderHeader, OrderItem} from '@advanced/index';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrderDetails} from '@actions/index';
import isEmpty from 'lodash/isEmpty';
import OrderFooter from '@screens/orders/order-details/order-footer';
import {CommonStyles, SPACE} from '@theme/styles';

const Order = ({route}) => {
  const {orderId} = route.params;
  const {order, cart} = useSelector((store) => store.Orders);
  const dispatch = useDispatch();
  const getOrderDetails = useCallback(async () => {
    await dispatch(fetchOrderDetails(orderId));
  }, [dispatch, orderId]);
  useEffect(() => {
    if (orderId) {
      getOrderDetails();
    }
  }, [getOrderDetails, orderId]);

  if (isEmpty(order)) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <FlatList
        ListHeaderComponent={() => <OrderHeader order={order} />}
        style={[CommonStyles.content, styles.content]}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        data={order.editMode ? cart : order.items}
        renderItem={({item}) => (
          <OrderItem item={item} editMode={order.editMode} />
        )}
        keyExtractor={(item, index) => `order_${index}`}
      />
      <OrderFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: SPACE * 2.5,
  },
  item: {
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  divider: {
    width: '100%',
    height: StyleSheet.hairlineWidth * 3,
    backgroundColor: '#CECECE',
    marginBottom: 12,
  },
});

export {Order};
export default Order;
