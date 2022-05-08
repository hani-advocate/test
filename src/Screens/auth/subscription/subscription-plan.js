import {Button, Spinner, Text} from '@root/Components';
import {CommonStyles, SPACE} from '@theme/styles';
import React, {useCallback, useState} from 'react';
import {AuthRoutes} from '@constants/Routes';
import SafeAreaView from 'react-native-safe-area-view';
import {SubscriptionPeriodCard} from './components/subscription-period-card';
import {SubscriptionPlanCard} from './components/subscription-plan-card';
import {View, ScrollView} from 'react-native';
import {strings} from '@root/i18n';
import {subscriptionsTypesStyles} from '@root/subscriptions-types.styles';
import {useStripe} from '@root/Hooks';

export const SubscriptionPlans = ({navigation}) => {
  const [selected, setSelected] = useState(0);
  const [period, setPeriod] = useState('yearly');
  const {planDetails} = useStripe();

  const onContinue = async () => {
    const data = planDetails[selected];
    navigation.navigate(AuthRoutes.SubscriptionMethods, {
      ...data.data,
      price: data.price,
    });
  };

  const onPeriodChanged = useCallback(
    (p) => {
      const temp = planDetails.findIndex((x) => x.period === p);
      setSelected(temp);
      setPeriod(p);
    },
    [planDetails],
  );

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={CommonStyles.content}>
        <View style={subscriptionsTypesStyles.header}>
          <Text
            className="header red"
            style={subscriptionsTypesStyles.headerText}>
            {strings('subscriptions.plans.topTitle')}
          </Text>
        </View>
        <Text
          className="normal black textLeft"
          style={{marginBottom: SPACE * 2}}>
          {strings('subscriptions.plans.topDesc')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: SPACE * 2,
          }}>
          <SubscriptionPeriodCard
            isActive={period === 'monthly'}
            text={'Monthly'}
            setActive={() => onPeriodChanged('monthly')}
          />
          <SubscriptionPeriodCard
            isRight
            text={'Yearly'}
            isActive={period === 'yearly'}
            setActive={() => onPeriodChanged('yearly')}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            {planDetails.map((item, index) =>
              item.period !== period ? null : (
                <SubscriptionPlanCard
                  key={index.toString()}
                  setActive={() => setSelected(index)}
                  isActive={index === selected}
                  item={item}
                />
              ),
            )}
          </View>
        </ScrollView>
        <View style={CommonStyles.submitButtonContainer}>
          <Button onPress={onContinue}>
            <Text className="bold white">{strings('common.btn.continue')}</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
