import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {
  Button,
  NavigatorBackButton,
  SEPABottomSheet,
  Text,
} from '@root/Components';
import {CommonStyles} from '@theme/styles';
import {strings} from '@root/i18n';
import {subscriptionsTypesStyles} from '@root/subscriptions-types.styles';
import {
  getPaymentIntentForOffer,
  createOrUpdateOffer,
  fetchCurrentUser,
} from '@actions/index';
import SafeAreaView from 'react-native-safe-area-view';
import {OffersRoutes} from '@constants/Routes';
import {useStripe} from '@root/Hooks';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SubscriptionPlansList} from '@root/Screens/auth/subscription/components/subscription-plans-list';
import reactotron from 'reactotron-react-native';

export const OfferPayment = ({navigation}) => {
  const bottomSheetRef = useRef(null);
  const {
    params: {offer = {}},
  } = useRoute();
  const dispatch = useDispatch();
  const {
    User: {me},
  } = useSelector(store => store);
  const {
    paymentMethods,
    payWithCreditCard,
    payWithSEPA,
    confirmSepaDebitPayment,
    confirmPaymentIntent,
  } = useStripe();
  const [selected, setSelected] = useState(0);

  const createAndBack = useCallback(async () => {
    await dispatch(createOrUpdateOffer({...offer, isPaid: true}));
    await dispatch(fetchCurrentUser());
    navigation.navigate(OffersRoutes.OffersList);
  }, [dispatch, navigation, offer]);

  const pay = async params => {
    try {
      const {paymentMethod} = paymentMethods[selected];
      if (paymentMethod === 'CREDIT') {
        const paymentIntentSecret = await getPaymentIntentForOffer({
          paymentMethod: ['card'],
        });
        const token = await payWithCreditCard(paymentMethod);
        await confirmPaymentIntent(paymentIntentSecret.id, token);
        createAndBack();
      } else if (paymentMethod === 'SEPA') {
        if (params?.accountHolderName && params?.iban) {
          try {
            const paymentIntentSecret = await getPaymentIntentForOffer({
              paymentMethod: 'sepa_debit',
            });

            const {} =
              // const token = await payWithSEPA(params);
              // await payWithSEPA(params);
              // await subscribe({
              //   iban: params.iban,
              //   accountHolderName: params.accountHolderName,
              //   paymentMethod,
              //   plan,
              //   recurring,
              //   price,
              // });
              reactotron.log({token});
            await confirmSepaDebitPayment(paymentIntentSecret.id, {
              ...params,
              tokenId: token.tokenId,
            });
          } catch (e) {
            console.log(e);
            throw new Error(e);
          }
        } else {
          bottomSheetRef.current.expand();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={[CommonStyles.content, {justifyContent: 'space-between'}]}>
        <NavigatorBackButton
          onPress={() => {
            navigation.navigate(OffersRoutes.OfferForm, {
              offer,
              requirePayment: true,
            });
          }}
        />
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
        {/* <View style={{flex: 1}}>
          {paymentMethods.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              activeOpacity={0.8}
              style={[subscriptionsTypesStyles.box(index === selected)]}
              onPress={() => {
                setSelected(index);
              }}>
              <View style={{flex: 1}}>
                <Image source={item.image} style={{width: 60, height: 60}} />
              </View>
              <View
                style={{
                  flex: 3,
                  alignItems: 'flex-start',
                }}>
                <Text className="normal  dark textLeft">
                  {strings(`subscriptions.methods.${item.paymentMethod}.desc`)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View> */}
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
