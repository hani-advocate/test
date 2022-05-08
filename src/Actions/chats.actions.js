import api from '@api/Chats.api';
import {
  AVAILABLE_CHATS_FETCHED,
  MESSAGES_FETCHED,
  UPDATE_CHAT,
} from '@types/index';
import socket from '@constants/Utils/socket.io';

export const getAvailableChats = () => async (dispatch) => {
  try {
    const res = await api.getAvailableChats();
    await dispatch({
      type: AVAILABLE_CHATS_FETCHED,
      payload: {list: res},
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const navigateToChat = (chat) => async (dispatch, getState) => {
  try {
    const res = await api.getMessagesByOrderId(chat.id);
    await dispatch({type: MESSAGES_FETCHED, payload: {...chat, messages: res}});
  } catch (e) {
    console.log(e);
  }
};

export const updateChat = (message) => async (dispatch, getState) => {
  try {
    const {
      Chats: {currentChat, list},
      User: {me},
    } = getState();
    let temp = list;
    if (message.toId === me.id && currentChat?.id !== message.orderId) {
      temp = list.map((x) => ({
        ...x,
        newMessagesCount:
          x.id === message.orderId
            ? x.newMessagesCount + 1
            : x.newMessagesCount,
      }));
    } else {
      currentChat.messages.push(message);
    }
    await dispatch({type: UPDATE_CHAT, payload: {currentChat, list: temp}});
  } catch (e) {
    console.log(e);
  }
};

export const resetChat = () => (dispatch) => {
  dispatch({type: 'RESET_CHAT'});
  socket.reset();
};
