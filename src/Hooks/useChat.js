import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useChat = () => {
  const {list, currentChat} = useSelector((store) => store.Chats);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {

    setUnreadMessagesCount(
      list.reduce((prev, curr) => prev + curr.newMessagesCount, 0),
    );
  }, [list]);

  const makeChatMessageRead = useCallback(
    (chat) => {
      dispatch({
        type: 'MAKE_CHAT_MESSAGES_READ',
        payload: list.map((x) => ({
          ...x,
          newMessagesCount: x.id === chat.id ? 0 : x.newMessagesCount,
        })),
      });
    },
    [dispatch, list],
  );

  return {
    list,
    currentChat,
    unreadMessagesCount,
    makeChatMessageRead,
  };
};
