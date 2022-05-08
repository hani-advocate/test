import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@root/Components';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {navigateToChat} from '@root/Actions/chats.actions';
import {useNavigation} from '@react-navigation/native';
import {MessagesRoutes} from '@constants/Routes';
import {strings} from '@root/i18n';
import {useIsShop} from '@root/Utils';
import {useChat} from '@root/Hooks';

const ChatListItem = ({chat}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isShopOwner = useIsShop();
  const {makeChatMessageRead} = useChat();
  const onPress = () => {
    dispatch(navigateToChat(chat));
    makeChatMessageRead(chat);
    navigation.navigate(MessagesRoutes.Chat);
  };
  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={() => onPress()}>
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text className="black bold" style={{textAlign: 'left'}}>
            {isShopOwner ? chat.user.name : chat.market.name}
          </Text>
          <Text className="smallSz red">
            {chat.newMessagesCount
              ? strings('chats.newMessagesCount', {
                  newMessagesCount: chat.newMessagesCount,
                })
              : ''}
          </Text>
        </View>
        <View style={styles.itemFooter}>
          <Text className="smallSz black">
            {moment(chat.createdAt).format('D, MMM hh:mmA')}
          </Text>
          <Text className="smallSz black" style={{alignContent: 'flex-start'}}>
            {strings('orders.orderNumber', {orderId: chat.id})}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 14,
    paddingTop: 6,
    marginBottom: 14,
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
  itemContent: {
    paddingBottom: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ChatListItem;
