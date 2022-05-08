import React from 'react';
import {BottomTabsRoutes as Routes} from '@constants/Routes';

import ActiveHome from '@svg/active-home.svg';
import InactiveHome from '@svg/inactive-home.svg';
import InactiveMessages from '@svg/inactive-messages.svg';
import ActiveMessages from '@svg/active-messages.svg';
import InactiveSpecialOffers from '@svg/inactive-specialOffers.svg';
import ActiveSpecialOffers from '@svg/active-specialOffers.svg';
import InactiveMenu from '@svg/inactive-menu.svg';
import ActiveMenu from '@svg/menu-active.svg';
import ActiveShop from '@svg/home-shop.svg';
import InActiveShop from '@svg/home-shop-inactive.svg';
import ActiveOrdersShop from '@svg/orders-shop.svg';
import InOrdersShop from '@svg/orders-shop-inactive.svg';
import {Selectors} from '@utils/index';
import {Text} from '@root/Components';
import {Colors} from '@theme/colors';
import IconBadge from 'react-native-icon-badge';
import {useChat} from '@root/Hooks';

const _default = ({route, focused, size}) => {
  const {unreadMessagesCount} = useChat();
  const defaultProps = {width: size, height: size};
  switch (route.name) {
    case Routes.Orders:
      return (
        <Selectors
          Shop={() => {
            return focused ? (
              <ActiveOrdersShop {...defaultProps} />
            ) : (
              <InOrdersShop {...defaultProps} />
            );
          }}
          Client={() => {
            return focused ? (
              <ActiveOrdersShop {...defaultProps} />
            ) : (
              <InOrdersShop {...defaultProps} />
            );
          }}
        />
      );
    case Routes.Messages:
      return focused ? (
        unreadMessagesCount ? (
          <IconBadge
            MainElement={<ActiveMessages {...defaultProps} />}
            BadgeElement={
              <Text style={{color: Colors.pr, fontSize: 10, top: 0}}>
                {unreadMessagesCount > 9 ? '+9' : unreadMessagesCount}
              </Text>
            }
            IconBadgeStyle={{
              width: 22,
              height: 22,
              top: -12,
              right: -12,
              borderColor: Colors.pr,
              borderWidth: 0.5,
              backgroundColor: Colors.bg,
            }}
            Hidden={false}
          />
        ) : (
          <ActiveMessages {...defaultProps} />
        )
      ) : unreadMessagesCount ? (
        <IconBadge
          MainElement={<InactiveMessages {...defaultProps} />}
          BadgeElement={
            <Text style={{color: '#FFF', fontSize: 10}}>
              {unreadMessagesCount > 9 ? '+9' : unreadMessagesCount}
            </Text>
          }
          IconBadgeStyle={{
            width: 20,
            height: 20,
            top: -10,
            right: -10,
            backgroundColor: Colors.pr,
          }}
          Hidden={false}
        />
      ) : (
        <InactiveMessages {...defaultProps} />
      );
    case Routes.Home:
      return (
        <Selectors
          Client={() => {
            return focused ? (
              <ActiveHome {...defaultProps} />
            ) : (
              <InactiveHome {...defaultProps} />
            );
          }}
          Shop={() => {
            return focused ? (
              <ActiveShop {...defaultProps} />
            ) : (
              <InActiveShop {...defaultProps} />
            );
          }}
        />
      );
    case Routes.SpecialOffers:
      return focused ? (
        <ActiveSpecialOffers {...defaultProps} />
      ) : (
        <InactiveSpecialOffers {...defaultProps} />
      );
    case Routes.Personal:
      return focused ? (
        <ActiveMenu {...defaultProps} />
      ) : (
        <InactiveMenu {...defaultProps} />
      );
    default:
      return null;
  }
};

export {_default as TabIcon};
export default _default;
