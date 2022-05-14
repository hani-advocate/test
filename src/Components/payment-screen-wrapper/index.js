import React, {useEffect, useState} from 'react';
import {initStripe} from '@stripe/stripe-react-native';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {subscriptionAPI} from '@api/subscriptions.api';

export const PaymentScreenWrapper = ({paymentMethod, children, onInit}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      const {publishableKey} = await subscriptionAPI.getKeys(paymentMethod);

      console.log({publishableKey});
      if (publishableKey) {
        await initStripe({
          publishableKey,
          merchantIdentifier: 'merchant.com.de.yalla-liefer',
          urlScheme:
            paymentMethod === 'wechat_pay' ? undefined : 'stripe-example',
          setReturnUrlSchemeOnAndroid: true,
        });
        setLoading(false);
        onInit?.();
      }
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
  ) : (
    <>{children}</>
  );
};

export default PaymentScreenWrapper;
