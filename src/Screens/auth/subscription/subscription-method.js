import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {Button, SEPABottomSheet, Spinner, Text} from '@root/Components';
import {CommonStyles} from '@theme/styles';
import {strings} from '@root/i18n';
import {subscriptionsTypesStyles} from '@root/subscriptions-types.styles';
import {useDispatch} from 'react-redux';
import {userSubscribe} from '@actions/index';
import SafeAreaView from 'react-native-safe-area-view';
import {AuthRoutes} from '@constants/Routes';
import {useStripe} from '@root/Hooks';
import {SubscriptionPlansList} from './components/subscription-plans-list';

export const SubscriptionMethods = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {plan = 'PRO', recurring = 'MONTHLY', price = 10} = route.params || {};
  const bottomSheetRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const {paymentMethods, payWithCreditCard, payWithSEPA, payWithNative} =
    useStripe();
  const [selected, setSelected] = useState(0);
  const subscribe = useCallback(
    async (params) => {
      setIsLoading(true);
      await dispatch(userSubscribe(params));
      setIsLoading(false);
      navigation.navigate(AuthRoutes.ShopInfo, {useDefaultValues: true});
    },
    [dispatch, navigation],
  );

  const pay = async (params) => {
    const {paymentMethod} = paymentMethods[selected];
    if (paymentMethod === 'CREDIT') {
      const {id} = await payWithCreditCard(paymentMethod);
      await subscribe({token: id, plan, recurring, price, paymentMethod});
    } else if (paymentMethod === 'SEPA') {
      if (params?.accountHolderName && params?.iban) {
        try {
          await payWithSEPA(params);
          await subscribe({
            iban: params.iban,
            accountHolderName: params.accountHolderName,
            paymentMethod,
            plan,
            recurring,
            price,
          });
        } catch (e) {
          console.log(e);
          throw new Error(e);
        }
      } else {
        bottomSheetRef.current.expand();
      }
    } else {
      const {tokenId} = await payWithNative({paymentMethod, plan, price});
      await subscribe({token: tokenId, plan, recurring, price, paymentMethod});
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={[CommonStyles.content, {justifyContent: 'space-between'}]}>
        <View style={subscriptionsTypesStyles.header}>
          <Text
            className="header red"
            style={subscriptionsTypesStyles.headerText}>
            {strings('subscriptions.methods.topTitle')}
          </Text>
        </View>
        <Text className="normal black textLeft" style={{marginBottom: 20}}>
          {strings('subscriptions.methods.topDesc')}
        </Text>
        <SubscriptionPlansList
          data={paymentMethods}
          selected={selected}
          setSelected={setSelected}
        />
        <View style={CommonStyles.submitButtonContainer}>
          <Button onPress={pay}>
            <Text className="bold white">{strings('common.btn.continue')}</Text>
          </Button>
        </View>
        <SEPABottomSheet bottomSheetRef={bottomSheetRef} onSubmit={pay} />
      </View>
    </SafeAreaView>
  );
};
