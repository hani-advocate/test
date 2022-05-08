import React, {useState} from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from '@root/Components';
import {useSelector} from 'react-redux';
import socket from '@constants/Utils/socket.io';
import {ICONS} from '@theme/icons';
import {isRTL, strings} from '@root/i18n';
import {useIsShop} from '@root/Utils';

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginHorizontal: 26,
    borderRadius: 10,
    backgroundColor: 'white',

    shadowOpacity: 0.8,
    shadowRadius: 12,
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowColor: 'rgba(69, 16, 17, 0.15)',
    elevation: 2,
    top: Platform.OS === 'android' ? -30 : -15,
  },
  send: {
    right: 0,
  },
});

export default ({}) => {
  const [msg, setMessage] = useState();
  const {
    User: {me},
    Chats: {currentChat},
  } = useSelector((store) => store);
  const isShopOwner = useIsShop();
  const onSend = async () => {
    if (!msg || msg === '') {
      return;
    }
    socket.sendMessage({
      msg,
      userId: me.id,
      orderId: currentChat.id,
      toId: isShopOwner ? currentChat?.userId : currentChat?.market?.userId,
    });
    Keyboard.dismiss();
    setMessage('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        Right={() => (
          <TouchableOpacity
            hitSlop={{left: 12, top: 12, right: 12, bottom: 12}}
            style={styles.send}
            onPress={() => onSend()}>
            {ICONS.send()}
          </TouchableOpacity>
        )}
        style={{
          textAlign: isRTL ? 'right' : 'left',
        }}
        value={msg}
        onChangeText={(val) => setMessage(val)}
        placeholder={strings('common.startTyping')}
      />
    </View>
  );
};
