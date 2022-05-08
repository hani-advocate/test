import React, {useCallback, useEffect, useState} from 'react';
import {init, removeAuthToken} from '@api/index';
import {useDispatch} from 'react-redux';
import {fetchCurrentUser} from '@actions/index';
import Spinner from '@components/Spinner';
import {getAvailableChats} from '@root/Actions/chats.actions';
import socket from '@constants/Utils/socket.io';
// import RNBootSplash from 'react-native-bootsplash';

const IsAuthenticated = ({children}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const checkUser = useCallback(async () => {
    const isTokenExist = await init();
    console.log({isTokenExist});
    if (isTokenExist) {
      console.log('token exist');
      const user = await dispatch(fetchCurrentUser());
      console.log('user fetched');
      if (user) {
        await dispatch(getAvailableChats());
        socket.joinRoom(undefined, user.id);
        console.log('user joined chat room and get available chats');
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  if (isLoading) {
    return <Spinner />;
  } else {
    return children;
  }
};

export default IsAuthenticated;
