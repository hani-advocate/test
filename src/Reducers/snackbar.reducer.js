import {HIDE_SNACKBAR, SHOW_SNACKBAR} from '@types/index';

const INITIAL_STATE = {
  visible: false,
  message: '',
  action: undefined,
};

export default (state = INITIAL_STATE, action) => {
  const {payload, type} = action;
  switch (type) {
    case SHOW_SNACKBAR:
      return {
        visible: true,
        message: payload.message,
        action: payload.action,
      };
    case HIDE_SNACKBAR:
      return INITIAL_STATE;
    default:
      return state;
  }
};
