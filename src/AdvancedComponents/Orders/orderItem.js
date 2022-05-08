import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@root/Components';
import Minus from '@svg/-.svg';
import Plus from '@svg/+.svg';
import {truncateString} from '@constants/Utils';
import {useDispatch} from 'react-redux';
import {changeItemQuantity} from '@actions/index';

export const OrderItem = ({item, editMode}) => {
  const dispatch = useDispatch();
  return (
    <View>
      <View style={styles.container}>
        <View style={{flex: 3}}>
          <Text className="textLeft price black">{item.name}</Text>
          <Text className="textLeft smallSz black">
            {item?.brand?.name}{' '}
            <Text className="textLeft smallSz black">
              {` (${item.weight} ${item.unit})`}
            </Text>
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text className={'bigPrice black'}>{`${item.quantity}`}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{flex: 3}}>
          <Text className="textLeft smallSz">
            {truncateString(item.description || '', 80)}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {editMode ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => dispatch(changeItemQuantity(item, -1))}>
                <Minus />
              </TouchableOpacity>
              <Text style={{marginHorizontal: 20}} className="red bold">
                {item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(changeItemQuantity(item, 1))}>
                <Plus />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{alignItems: 'flex-end'}}>
              <Text className={'price'}>{`€${item.price}`}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
