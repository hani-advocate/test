import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@root/Components';
import Cart from '@svg/illustration-cart.svg';
import {strings} from '@root/i18n';

const OfferListHeader = () => {
  return (
    <View style={styles.header}>
      <View style={{flex: 3}}>
        <Text style={{textAlign: 'left'}} className="header red">
          {strings('offers.headerTitle')}
        </Text>
        <Text style={{textAlign: 'left'}} className="smallSz">
          {strings('offers.headerText')}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Cart />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 22,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OfferListHeader;
