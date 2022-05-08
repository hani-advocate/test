import React from 'react';
import {View} from 'react-native';
import {Text} from '@root/Components';
import Illustration from '@svg/messages-illustration.svg';
import {strings} from '@root/i18n';

const ChatListHeader = () => {
  return (
    <React.Fragment>
      <View style={{flex: 3}}>
        <Text style={{textAlign: 'left'}} className="header red">
          {strings('chats.messages')}
        </Text>
        <Text style={{textAlign: 'left'}} className="smallSz">
          {strings('chats.headerText')}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Illustration />
      </View>
    </React.Fragment>
  );
};

export default ChatListHeader;
