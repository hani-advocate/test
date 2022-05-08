import {
  AVAILABLE_CHATS_FETCHED,
  MESSAGES_FETCHED,
  UPDATE_CHAT,
} from '@types/index';

const initial_state = {
  list: [],
  currentChat: {},
  unreadMessagesCount: 0,
};

export default (state = initial_state, action) => {
  const {type, payload} = action;
  switch (type) {
    case AVAILABLE_CHATS_FETCHED:
      return {...state, ...payload};
    case MESSAGES_FETCHED:
      return {...state, currentChat: payload};
    case UPDATE_CHAT:
      return {...state, ...payload};
    case 'MESSAGES_COUNT':
      return {...state, currentChat: payload};
    case 'MAKE_CHAT_MESSAGES_READ':
      return {...state, list: payload};
    case 'RESET_CHAT':
      return {...state, currentChat: {}};
    default:
      return {...state};
  }
};
