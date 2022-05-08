import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from '@root/Components';
import {OffersRoutes} from '@constants/Routes';
import {strings} from '@root/i18n';
import React from 'react';
import {useSelector} from 'react-redux';
import {Colors} from '@theme/colors';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  offerUsageWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowColor: 'rgba(69, 16, 17, 0.15)',
    elevation: 2,
  },
  addNewBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.pr,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowColor: 'rgba(88, 88, 183, 0.2)',
    elevation: 1,
  },
});

export const CreateOffer = ({setIsVisible}) => {
  const {subscription} = useSelector((store) => store.User);
  const navigation = useNavigation();
  const requirePayment = subscription.currentOffers >= subscription.totalOffers;
  return (
    <View style={styles.offerUsageWrapper}>
      <View style={{alignItems: 'flex-start'}}>
        <Text className="caption normal grey">{'Offers Usage'}</Text>
        <Text className="header black">{`${subscription.currentOffers}/${subscription.totalOffers}`}</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          if (requirePayment) {
            setIsVisible(true);
          } else {
            navigation.navigate(OffersRoutes.OfferForm, {
              offer: {},
              requirePayment: false,
            });
          }
        }}>
        <View style={styles.addNewBtn}>
          <Text className="caption bold white">
            {strings('offers.btn.addNew')}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
