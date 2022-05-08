import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  if (!name) {
    return;
  }
  navigationRef.current?.navigate(name, params);
};

export const push = (...args) => {
  navigationRef.current?.dispatch(StackActions.push(...args));
};

export const goBack = () => {
  navigationRef.current?.goBack();
};
