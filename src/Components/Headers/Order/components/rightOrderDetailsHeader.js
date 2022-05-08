import React from 'react';
import {Text} from '@root/Components';
import {TouchableOpacity} from 'react-native';
import {orderStatus} from '@constants/Utils';
import {RE_ORDER_MODE} from '@types/index';
import {BottomTabsRoutes, HomeRoutes} from '@constants/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useIsShop} from '@root/Utils';
import {strings} from '@root/i18n';

const RightOrderDetailsHeader = () => {
  const dispatch = useDispatch();
  const isShopOwner = useIsShop();
  const {order} = useSelector((store) => store.Orders);
  const navigation = useNavigation();
  const getRightLabel = () => {
    if (order.status === orderStatus.DONE && !isShopOwner) {
      return strings('common.btn.reorder');
    }
    return '';
  };

  const onPress = async () => {
    if (order.status === orderStatus.DONE && !isShopOwner) {
      await dispatch({type: RE_ORDER_MODE, payload: order});
      navigation.navigate(BottomTabsRoutes.Home, {screen: HomeRoutes.Cart});
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={{flex: 1}}>
      <Text className="bold white" style={{textAlign: 'right'}}>
        {getRightLabel()}
      </Text>
    </TouchableOpacity>
  );
};

export {RightOrderDetailsHeader};
export default RightOrderDetailsHeader;
