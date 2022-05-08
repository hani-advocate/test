import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {SPACE} from '@theme/styles';
import {FlatList} from 'react-native';
import {useIsShop} from '@root/Utils';
import {useDispatch, useSelector} from 'react-redux';
import {ProductCard} from './product-card';
import {addItemToCart, removeItemFromMenu} from '@actions/index';
import {modalActionTypes, modalModes} from '@constants/Utils';
import {ModalContext} from '@advanced/Modal';
import {HomeRoutes} from '@constants/Routes';
import {useNavigation} from '@react-navigation/native';

export const ProductsList = ({products, refreshItems}) => {
  const isShopOwner = useIsShop();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const flatListRef = useRef();
  const [, setModal] = useContext(ModalContext);
  const {cart} = useSelector((store) => store.Orders);

  const onAdd = useCallback(
    (item) => {
      dispatch(addItemToCart(item));
    },
    [dispatch],
  );

  useEffect(() => {
    if (products.length === 10) {
      flatListRef.current.scrollToIndex({animated: true, index: 0});
    }
  }, [products]);

  const onRemove = useCallback(
    (item) => {
      setModal({
        type: modalActionTypes.SET,
        payload: {
          mode: modalModes.CONFIRMATION,
          primary: {
            text: 'DELETE',
            action: async () => {
              await dispatch(removeItemFromMenu(item.id));
              // refreshItems();
            },
          },
          secondary: {
            text: 'CANCEL',
            action: () => '',
          },
        },
      });
    },
    [dispatch, setModal],
  );
  const onItemPressed = useCallback(
    (item) => {
      isShopOwner
        ? navigation.push(HomeRoutes.AddProduct, {
            editMode: true,
            item,
          })
        : navigation.navigate(HomeRoutes.Product, {item});
    },
    [isShopOwner, navigation],
  );
  return (
    <FlatList
      ref={flatListRef}
      contentContainerStyle={{
        marginTop: SPACE * 1.5,
        paddingBottom: isShopOwner ? 64 : 0,
      }}
      data={products}
      onEndReachedThreshold={0.5}
      onEndReached={(info) => {
        refreshItems(null, products.length);
      }}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <ProductCard
          cart={cart}
          isShopOwner={isShopOwner}
          item={item}
          onAdd={() => onAdd(item)}
          onRemove={() => onRemove(item)}
          onItemPress={() => onItemPressed(item)}
        />
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
};
