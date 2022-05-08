import {Colors} from '@theme/colors';
import {View} from 'react-native';
import {Text} from '@root/Components';
import React from 'react';
import {useSelector} from 'react-redux';

export const OfferPaymentBanner = () => {
  const {subscription} = useSelector((store) => store.User);
  if (!subscription || subscription.currentOffers < subscription.totalOffers) {
    return null;
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.pr,
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
      }}>
      <View style={{flex: 4, flexGrow: 5}}>
        <Text className="caption bold normal white textLeft">
          {
            'Subscription Plan is Over, all the new offers you all will be paid separately'
          }
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text className="big white">{'5€'}</Text>
      </View>
    </View>
  );
};
