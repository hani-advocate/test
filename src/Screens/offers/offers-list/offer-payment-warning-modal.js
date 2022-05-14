import {StyleSheet, TouchableOpacity, View} from 'react-native';
import X from '@svg/x-red.svg';
import NoFreeOffers from '@svg/no-free-offers.svg';
import {Button, Text} from '@root/Components';
import {OffersRoutes} from '@constants/Routes';
import Modal from 'react-native-modal';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {strings} from '@root/i18n';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  cancel: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
});

export const OfferPaymentWarningModal = ({isVisible, setIsVisible}) => {
  const navigation = useNavigation();
  const {subscription} = useSelector(store => store.User);

  return (
    <Modal isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
      <View style={styles.container}>
        <TouchableOpacity
          hitSlop={{top: 12, left: 12, right: 12, bottom: 12}}
          onPress={() => setIsVisible(false)}
          style={styles.cancel}>
          <X />
        </TouchableOpacity>
        <NoFreeOffers />
        <Text className="bigPrice black" style={{marginBottom: 8}}>
          {strings('offers.planIsOver', {plan: subscription.plan})}
        </Text>
        <Text className="caption black">
          {strings('offers.paymentWarning')}
        </Text>
        <>
          <Button
            style={{marginTop: 20, marginBottom: 10}}
            onPress={async () => {
              setIsVisible(false);
              setTimeout(() => {
                navigation.navigate(OffersRoutes.OfferForm, {
                  offer: {},
                  requirePayment: true,
                });
              }, 230);
            }}>
            <Text className="white bold">{strings('common.btn.continue')}</Text>
          </Button>
          <Button
            style={{marginBottom: 10}}
            mode="outline"
            onPress={() => setIsVisible(false)}>
            <Text className="bold red">{strings('common.btn.cancel')}</Text>
          </Button>
        </>
      </View>
    </Modal>
  );
};
