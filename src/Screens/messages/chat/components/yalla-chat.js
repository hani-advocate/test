import React from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import YallaSend from './yalla-send';
import YallaBubble from './yalla-bubble';
import moment from 'moment';
import {useSelector} from 'react-redux';

const formatMessages = (messages, market, currentUser) =>
  messages.map((m, i) => ({
    _id: i,
    text: m.msg,
    createdAt: moment(m.createdAt),
    user: {
      _id: m.userId,
      name: currentUser.id === m.userId ? currentUser.name : market.name,
      sent: true,
    },
  }));

export default ({messages = [], market}) => {
  const {me} = useSelector((store) => store.User);
  const formattedMessages = [...formatMessages(messages, market, me)];
  return (
    <GiftedChat
      scrollToBottom
      renderLoadEarlier={() => null}
      loadEarlier
      inverted={false}
      messages={formattedMessages}
      renderAvatarOnTop={false}
      user={{
        _id: me.id,
      }}
      listViewProps={{
        bounces: true,
        onEndReached: () => {},
        onEndReachedThreshold: 0.2,
        contentContainerStyle: {
          justifyContent: 'flex-start',
        },
      }}
      showUserAvatar={true}
      renderBubble={(props) => <YallaBubble {...props} />}
      renderInputToolbar={(props) => <YallaSend {...props} />}
      bottomOffset={0}
      renderChatFooter={() => <View style={{height: 32}} />}
    />
  );
};
