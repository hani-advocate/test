import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {shadow} from 'react-native-paper';
import defaultImage from '@svg/default-item.png';
import {Text} from '@root/Components';
import FastImage from 'react-native-fast-image';
import DeleteTrash from '@svg/delete_trash.svg';
import {isInCart} from '@constants/Utils';
import ActiveCart from '@svg/add-to-cart-active.svg';
import InactiveCart from '@svg/add-to-cart-inactive.svg';
import {SPACE} from '@theme/styles';
import {strings} from '@root/i18n';

const renderTopRightIcon = ({isShopOwner, onRemove, onAdd, isAddedToCart}) => {
  return isShopOwner ? (
    <TouchableOpacity style={styles.cart} onPress={onRemove}>
      <DeleteTrash />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.cart} onPress={onAdd}>
      {isAddedToCart ? <ActiveCart /> : <InactiveCart />}
    </TouchableOpacity>
  );
};

export const ProductCard = ({
  cart,
  item,
  isShopOwner,
  onRemove,
  onAdd,
  onItemPress,
}) => {
  const isAddedToCart = isInCart(cart, item);
  return (
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onItemPress(item)}
        style={[styles.item]}>
        {renderTopRightIcon({isAddedToCart, isShopOwner, onAdd, onRemove})}
        <FastImage
          resizeMode="contain"
          source={item.images[0] ? {uri: item.images[0]} : defaultImage}
          style={styles.image}
        />
        <View style={[styles.cardContainer, {padding: SPACE}]}>
          <Text
            className={'textLeft price black'}
            style={{fontSize: 16, paddingRight: SPACE * 2}}
            numberOfLines={2}>
            {item.name}
          </Text>
          <View style={{marginTop: SPACE}}>
            <View style={styles.infoRowContainer}>
              <Text className={'textLeft'} numberOfLines={1}>
                {strings('common.price')}
              </Text>
              <Text numberOfLines={1} className={'bigPrice'}>
                €{item.price}
              </Text>
            </View>
            <View style={[styles.infoRowContainer, {marginBottom: 4}]}>
              <Text className={'textLeft'} numberOfLines={1}>
                {strings('common.brand')}
              </Text>
              <Text className={'black bold'} numberOfLines={1}>
                {item.brand.name}
              </Text>
            </View>
            <View style={[styles.infoRowContainer, {marginBottom: 4}]}>
              <Text className={'textLeft'} numberOfLines={1}>
                {strings('common.weight')}
              </Text>
              <Text className={'black bold'} numberOfLines={1}>
                {`${item.weight} ${item.unit}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  infoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  cart: {
    position: 'absolute',
    zIndex: 1,
    top: SPACE,
    right: SPACE,
  },
  row: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  item: {
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  image: {
    width: '30%',
    height: '100%',
    borderRadius: 6,
    ...shadow(2),
  },
});
