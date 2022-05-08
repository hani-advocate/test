import React from 'react';
import {styles} from '@components/Headers/Order/styles';
import Cancel from '@svg/x.svg';
import Arrow from '@svg/arrow-left.svg';
import {TouchableOpacity} from 'react-native';
import {CLEAR_ORDER, SET_ORDER_EDIT_MODE} from '@types/index';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import isEmpty from 'lodash/isEmpty';
import {ICONS} from '@theme/icons';

const LeftOrderDetailsHeader = () => {
  const dispatch = useDispatch();
  const {order} = useSelector((store) => store.Orders);
  const navigation = useNavigation();
  const onPress = async () => {
    if (order.editMode) {
      await dispatch({type: SET_ORDER_EDIT_MODE, payload: false});
    } else {
      await dispatch({type: CLEAR_ORDER});
      navigation.goBack();
    }
  };
  if (isEmpty(order)) {
    return null;
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconStyle}>
      {order.editMode ? <Cancel /> : ICONS.whiteBackArrow()}
    </TouchableOpacity>
  );
};
export {LeftOrderDetailsHeader};
export default LeftOrderDetailsHeader;
