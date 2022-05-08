import React, {useCallback, useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {FlatList, StyleSheet, View} from 'react-native';
import EmptyChatListComponent from './empty-chat-list-component';
import ChatListHeader from './chat-list-header';
import ChatListItem from './chat-list-item';
import {useDispatch, useSelector} from 'react-redux';
import {getAvailableChats, resetChat} from '@root/Actions/chats.actions';
import {Spinner} from '@root/Components';
import {CommonStyles} from '@theme/styles';
import {useFocusEffect} from '@react-navigation/native';

const ChatList = () => {
  const dispatch = useDispatch();
  const [loading, isLoading] = useState(true);
  const {list} = useSelector(store => store.Chats);
  const getChat = useCallback(async () => {
    await dispatch(getAvailableChats());
    dispatch(resetChat());
    isLoading(false);
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      getChat();
    }, [getChat]),
  );

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={CommonStyles.content}>
        <View style={styles.header}>
          <ChatListHeader />
        </View>
        <FlatList
          ListEmptyComponent={() =>
            loading ? <Spinner /> : <EmptyChatListComponent />
          }
          data={list}
          renderItem={({item}) => <ChatListItem chat={item} />}
          keyExtractor={(item, index) => `${index}_orders_list`}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 22,
    paddingBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export {ChatList};
export default ChatList;
