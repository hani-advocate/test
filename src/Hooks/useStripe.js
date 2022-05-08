import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  getNativePaymentOptions,
  PaymentMethods,
  PLANS_DETAILS,
  STRIPE_PUBLIC_KEY,
} from '@root/payment-helpers';
import ApplePayImg from '@svg/apple-pay-icon.png';
import GooglePayImg from '@svg/google-pay-icon.png';
// import stripe from 'tipsi-stripe';

// stripe.setOptions({
//   publishableKey: STRIPE_PUBLIC_KEY,
//   merchantId: 'merchant.com.de.yalla-liefer',
//   androidPayMode: 'test',
// });

const stripe = {};

const cleanObject = obj => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};

export const useStripe = () => {
  const [planDetails] = useState(PLANS_DETAILS);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    setPaymentMethods([
      ...PaymentMethods,
      Platform.OS === 'ios'
        ? {
            image: ApplePayImg,
            desc: '',
            paymentMethod: 'APPLE',
          }
        : {
            image: GooglePayImg,
            desc: '',
            paymentMethod: 'GOOGLE',
          },
    ]);
  }, []);

  const payWithCreditCard = useCallback(async () => {
    try {
      const token = await stripe.paymentRequestWithCardForm({
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
      });
      return token;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }, []);
  const payWithSEPA = useCallback(async ({accountHolderName, iban}) => {
    try {
      return stripe.createTokenWithBankAccount({
        accountNumber: iban,
        countryCode: 'DE',
        currency: 'EUR',
        accountHolderName: accountHolderName,
      });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }, []);
  const payWithNative = useCallback(async ({paymentMethod, plan, price}) => {
    try {
      const isDeviceSupportNativePay = await stripe.deviceSupportsNativePay();
      const canMakeNativePayment = await stripe.canMakeNativePayPayments();
      if (isDeviceSupportNativePay && canMakeNativePayment) {
        const isGooglePay = paymentMethod === 'GOOGLE';
        const {options, items} = getNativePaymentOptions({
          isGooglePay,
          plan,
          price,
        });
        console.log('payWithNative', options, items, isGooglePay);
        const token = await stripe.paymentRequestWithNativePay(options, items);
        await stripe.completeNativePayRequest();
        return token;
      }
    } catch (e) {
      console.log(e);
      await stripe.cancelNativePayRequest();
      throw new Error(e);
    }
  }, []);

  const confirmPaymentIntent = useCallback(async (clientSecret, token) => {
    try {
      return stripe.confirmPaymentIntent({
        clientSecret,
        paymentMethodId: token.id,
      });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }, []);

  const confirmSepaDebitPayment = useCallback(
    (clientSecret, {iban, accountHolderName, tokenId}) => {
      try {
        console.log({tokenId});
        return stripe.confirmPaymentIntent({
          clientSecret,
          paymentMethodId: tokenId,
          // payment_method: {
          //   sepa_debit: iban,
          //   billingDetails: {
          //     name: accountHolderName,
          //     email: 'hani.narket@gmail.com',
          //   },
          // },
        });
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
    },
    [],
  );

  const createPaymentMethod = useCallback(() => {}, []);

  return {
    planDetails,
    paymentMethods,
    payWithCreditCard,
    payWithSEPA,
    payWithNative,
    confirmPaymentIntent,
    confirmSepaDebitPayment,
  };
};
