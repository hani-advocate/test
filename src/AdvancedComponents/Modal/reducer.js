import {modalActionTypes} from '@constants/Utils';

export default (state, action) => {
  switch (action.type) {
    case modalActionTypes.SHOW:
      return {...state, visible: true};
    case modalActionTypes.HIDE:
      return {...state, visible: false};
    case modalActionTypes.SET:
      return {
        visible: true,
        ...action.payload,
      };
    default:
      return state;
  }
};
