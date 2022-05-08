import React from 'react';
import {Snackbar as RNSnackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {HIDE_SNACKBAR} from '@types/index';

const Snackbar = () => {
  const {visible, message, action} = useSelector(store => store.Snackbar);
  const dispatch = useDispatch();

  const onDismiss = () => {
    dispatch({type: HIDE_SNACKBAR});
  };

  return (
    <RNSnackbar
      duration={3000}
      visible={visible}
      onDismiss={onDismiss}
      action={action}>
      {message}
    </RNSnackbar>
  );
};

export default Snackbar;
