import React, {useEffect} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {StyleSheet} from 'react-native';
import Chat from './components/yalla-chat';
import {useSelector} from 'react-redux';
import socket from '@constants/Utils/socket.io';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  content: {
    paddingHorizontal: 16,
  },
});

const _default = () => {
  const {
    Chats: {currentChat: chat},
    User: {me},
  } = useSelector((store) => store);
  useEffect(() => {
    if (chat && chat.id) {
      socket.joinRoom(chat.id, me.id);
    }
  }, [chat, me]);
  return (
    <SafeAreaView style={styles.container}>
      <Chat messages={chat.messages} market={chat.market} />
    </SafeAreaView>
  );
};

export {_default as name};
export default _default;
