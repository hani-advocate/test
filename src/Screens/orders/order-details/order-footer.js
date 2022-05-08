import React from 'react';
import {Button, Text} from '@root/Components';
import {Receipt} from '@advanced/index';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  acceptOrder,
  cancelOrder,
  deliverOrder,
  updateOrder,
} from '@actions/index';
import {useNavigation} from '@react-navigation/native';
import {orderStatus} from '@constants/Utils';
import {BottomTabsRoutes, MessagesRoutes} from '@constants/Routes';
import {navigateToChat} from '@root/Actions/chats.actions';
import {strings} from '@root/i18n';
import {SET_ORDER_EDIT_MODE} from '@types/index';
import {statusColor} from '@theme/colors';

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 30,
    marginTop: 15,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowColor: 'rgba(88, 88, 183, 0.2)',
    elevation: 2,
  },
});

const OrderFooter = () => {
  const {order, cart} = useSelector((store) => store.Orders);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onAcceptOrder = async () => {
    await dispatch(acceptOrder(order.id));
  };
  const declineOrder = async () => {
    dispatch(cancelOrder(order.id));
    navigation.goBack();
  };

  const onMessage = async () => {
    dispatch(navigateToChat(order));
    navigation.navigate(BottomTabsRoutes.Messages, {
      screen: MessagesRoutes.Chat,
    });
  };

  const onDeliverOrder = async () => {
    await dispatch(deliverOrder(order.id));
    navigation.goBack();
  };

  const toggleEditMode = async () => {
    await dispatch({type: SET_ORDER_EDIT_MODE, payload: true});
  };

  const onUpdateOrder = async () => {
    await dispatch(
      updateOrder(order.id, {
        items: cart,
        marketId: order.market.id,
        addressId: order.addressId,
      }),
    );
  };

  if (order.status === orderStatus.PENDING) {
    return (
      <View style={styles.btn}>
        <Button style={{marginBottom: 10}} onPress={onAcceptOrder}>
          <Text className="bold white">
            {strings('orders.btn.acceptOrder')}
          </Text>
        </Button>
        <Button mode="outline" onPress={declineOrder}>
          <Text className="bold red">{strings('orders.btn.declineOrder')}</Text>
        </Button>
      </View>
    );
  }
  if (order.status === orderStatus.IN_PROGRESS) {
    return (
      <View style={styles.btn}>
        <Button
          style={{marginBottom: 10}}
          onPress={() => (order.editMode ? onUpdateOrder() : onDeliverOrder())}>
          <Text className="bold white">
            {order.editMode
              ? strings('orders.btn.saveChanges')
              : strings('orders.btn.delivered')}
          </Text>
        </Button>
        <Button mode="outline" onPress={toggleEditMode}>
          <Text className="bold red">
            {order.editMode
              ? strings('common.btn.cancel')
              : strings('orders.btn.editOrder')}
          </Text>
        </Button>
      </View>
    );
  }
  if (order.status === orderStatus.DONE) {
    return (
      <Receipt
        bg={statusColor(order.editMode ? orderStatus.CANCELED : order.status)}
        mode="cart"
        subtotal={`€${order.subtotal}`}
        dcost={`€${order.deliveryCost}`}
        tcost={`€${order.total}`}
        rated={null}
        text={null}
        showDash={false}
        onPress={() => {}}
        hideArrow
      />
    );
  }
  return null;
};

export default OrderFooter;
