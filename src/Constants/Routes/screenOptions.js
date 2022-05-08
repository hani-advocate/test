import React from 'react';
import {Colors} from '@theme/theme';
import {TouchableOpacity} from 'react-native';
import MarketHeader from '@components/Headers/market';
import CartHeader from '@components/Headers/cart';
import MarketProfileHeader from '@components/Headers/marketProfileHeader';
import Cancel from '@svg/x-red.svg';
import ProductHeader from '@screens/Client/Product/ProductHeader';

export const marketOptions = {header: (props) => <MarketHeader {...props} />};
export const cartOptions = {header: (props) => <CartHeader {...props} />};
export const checkoutOptions = {
  header: (props) => <CartHeader {...props} arrow />,
};
export const marketProfileOptions = {
  header: (props) => <MarketProfileHeader {...props} />,
};
export const addressOptions = {
  title: 'Add Address',
  headerTitleStyle: {
    fontFamily: 'Roboto',
    fontWeight: '900',
    color: '#565656',
  },
  headerStyle: {
    backgroundColor: Colors.bg,
  },
  headerLeftContainerStyle: {
    marginLeft: 22,
  },
  headerLeft: ({onPress}) => (
    <TouchableOpacity onPress={onPress}>
      <Cancel />
    </TouchableOpacity>
  ),
};
export const productOptions = {
  title: '',
  headerTitleStyle: {
    fontFamily: 'Roboto',
    fontWeight: '900',
    color: '#565656',
  },
  headerStyle: {
    backgroundColor: Colors.bg,
  },
  headerLeftContainerStyle: {
    marginLeft: 22,
  },
  headerRightContainerStyle: {
    marginRight: 22,
  },
  header: (props) => <ProductHeader {...props} />,
};
