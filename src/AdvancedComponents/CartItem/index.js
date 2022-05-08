import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@root/Components';
import Minus from '@svg/-.svg';
import Plus from '@svg/+.svg';
import {useDispatch} from 'react-redux';
import {truncateString} from '@constants/Utils';
import {
  changeItemQuantity,
  removeItemFromCart,
} from '@root/Actions/orders.actions';
import MinusInactive from '@svg/minus-inactive.svg';
import Trash from '@svg/delete_trash.svg';
import {isRTL, strings} from '@root/i18n';

export const CartItem = ({item}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.item}>
      <View>
        <TouchableOpacity
          style={{alignItems: 'flex-end'}}
          onPress={() => dispatch(removeItemFromCart(item))}>
          <Trash style={{marginLeft: 10}} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 3}}>
        <Text className="textLeft price black">{item.name}</Text>
        <Text className="textLeft smallSz black">
          {item?.brand?.name}{' '}
          <Text className="textLeft smallSz black">
            {` (${item.weight} ${item.unit})`}
          </Text>
        </Text>
        <Text className="textLeft smallSz">
          {truncateString(item.description || '', 80)}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text className="price" style={{textAlign: 'right', marginBottom: 12}}>
          {`€${item.price * item.quantity}`}
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => dispatch(removeItemFromCart(item))}>
            <Trash style={{[isRTL ? 'marginRight' : 'marginLeft']: 10}} />
          </TouchableOpacity>
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.quantity <= 1 ? (
            <TouchableOpacity
              hitSlop={{top: 18, left: 18, bottom: 18, right: 18}}>
              <MinusInactive />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              hitSlop={{top: 18, left: 18, bottom: 18, right: 18}}
              onPress={() => dispatch(changeItemQuantity(item, -1))}>
              <Minus />
            </TouchableOpacity>
          )}
          <Text style={{marginHorizontal: 20}} className="price">
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={() => dispatch(changeItemQuantity(item, 1))}>
            <Plus />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
