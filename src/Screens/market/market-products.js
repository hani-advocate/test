import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import Spinner from '@components/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMarketCategories,
  getMarketItems,
} from '@root/Actions/market.actions';
import Empty from '@svg/empty-orders.svg';
import IsEmpty from 'lodash/isEmpty';
import {SPACE} from '@theme/styles';
import {CategoriesFilter} from './categories-filter';
import {ProductsList} from './products-list';
import {useFocusEffect} from '@react-navigation/native';

export const MarketProducts = () => {
  const dispatch = useDispatch();
  const {
    Markets: {marketCategories, market, marketItems},
    User: {me},
  } = useSelector((store) => store);
  const currentMarket = IsEmpty(market) ? me.market : market;
  const [currentCategory, setCurrentCategory] = useState(null);

  const fetchItems = useCallback(
    async (id, offset = 0) => {
      setCurrentCategory(id || currentCategory);
      dispatch({
        type: 'SET_CURRENT_CATEGORY_TYPE',
        payload: id || currentCategory,
      });
      dispatch(
        getMarketItems(currentMarket?.id, {
          category: id || currentCategory,
          limit: 10,
          offset,
        }),
      );
    },
    [dispatch, currentMarket, currentCategory],
  );

  useFocusEffect(
    React.useCallback(() => {
      if (currentCategory || marketCategories.length) {
        const activeCategory =
          marketCategories?.find((c) => c.id === currentCategory)?.id ||
          marketCategories?.[0]?.id;
        if (activeCategory) {
          fetchItems(activeCategory);
        }
      }
    }, [currentCategory, marketCategories, fetchItems]),
  );

  // get the categories once onComponentMount
  useEffect(
    React.useCallback(() => {
      const getCategories = async () => {
        if (currentMarket?.id) {
          const temp = await dispatch(getMarketCategories(currentMarket?.id));
          if (!currentCategory && temp?.length) {
            setCurrentCategory(temp[0].id);
            fetchItems(temp[0].id);
          }
        }
      };
      getCategories();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCategory, dispatch, fetchItems]),
    [],
  );

  useEffect(() => {
    if (currentCategory) {
      fetchItems(currentCategory);
    }
  }, [currentCategory, fetchItems]);

  if (!currentMarket) {
    return <Spinner />;
  }

  if (marketCategories && marketCategories.length) {
    return (
      <View style={[{flex: 1, marginTop: SPACE}]}>
        <CategoriesFilter
          categories={marketCategories}
          activeCategory={currentCategory}
          onPress={setCurrentCategory}
        />
        <ProductsList products={marketItems} refreshItems={fetchItems} />
      </View>
    );
  }
  return (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Empty />
    </View>
  );
};
