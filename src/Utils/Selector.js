import React from 'react';
import {useSelector} from 'react-redux';

export const Selectors = ({Client, Shop}) => {
  const isShop = useSelector((state) => state.User.isShop);
  return isShop ? <Shop /> : <Client />;
};
