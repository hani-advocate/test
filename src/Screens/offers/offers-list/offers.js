import React, {useCallback, useEffect, useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {FlatList, View} from 'react-native';
import OfferItem from '@screens/offers/offers-list/offer-item';
import EmptyOffersListComponent from '@screens/offers/offers-list/empty-offers-list-component';
import OfferListHeader from '@screens/offers/offers-list/offer-list-header';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOffersList} from '@actions/index';
import {useFocusEffect} from '@react-navigation/native';
import {CommonStyles} from '@theme/styles';
import {trackPromise} from 'react-promise-tracker';
import {OfferPaymentWarningModal} from './offer-payment-warning-modal';
import {OffersFilters} from './offers-filters';
import {CreateOffer} from './create-offer';

const OffersList = () => {
  const dispatch = useDispatch();
  const {list} = useSelector(store => store.Offers || []);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('all');

  const getOffersList = useCallback(
    value => {
      trackPromise(dispatch(fetchOffersList({filter: value})), 'offers-list');
    },
    [dispatch],
  );

  useEffect(() => {
    getOffersList(filter);
  }, [filter, getOffersList]);

  useFocusEffect(
    useCallback(() => {
      getOffersList(filter);
    }, [getOffersList, filter]),
  );

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={CommonStyles.content}>
        <OfferListHeader />
        <OffersFilters filter={filter} setFilter={setFilter} />
        <CreateOffer setIsVisible={setIsVisible} />
        <FlatList
          ListEmptyComponent={() => <EmptyOffersListComponent />}
          data={list}
          renderItem={({item}) => <OfferItem offer={item} />}
          keyExtractor={(item, index) => `${index}_offers_list`}
        />
        <OfferPaymentWarningModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      </View>
    </SafeAreaView>
  );
};

export {OffersList};
export default OffersList;
