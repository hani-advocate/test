import React from 'react';
import {subscriptionsTypesStyles} from '@root/subscriptions-types.styles';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '@root/Components';
import {strings} from '@root/i18n';

export const SubscriptionPlanCard = ({isActive, setActive, item}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[subscriptionsTypesStyles.test(isActive)]}
      onPress={setActive}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{fontSize: 48}}
            className={`big ${isActive ? 'red' : 'black'}`}>
            {strings(`subscriptions.plans.${item.data.plan}.title`)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Text
              className={`header ${isActive ? 'red' : 'black'}`}
              style={{paddingTop: 8}}>
              €
            </Text>
            <Text
              style={{fontSize: 48}}
              className={`big ${isActive ? 'red' : 'black'}`}>
              {item.price}
            </Text>
            <Text
              className={`header ${isActive ? 'red' : 'black'}`}
              style={{paddingTop: 20}}>
              {`/${strings(
                `subscriptions.plans.perPeriod.${item.data.recurring}`,
              )}`}
            </Text>
          </View>
        </View>
        {item.data.plan === 'PRO' && (
          <Text className="normal dark textLeft">
            {strings(
              `subscriptions.plans.${item.data.plan}.desc.${item.data.recurring}`,
            )}
          </Text>
        )}
        <Text
          className={'bold price dark textLeft'}
          style={{marginVertical: 5, textDecorationLine: 'underline'}}>
          {strings('common.features')}
        </Text>
        {item.features.map((feature) => (
          <View style={{flexDirection: 'row'}}>
            <Text>{'\u2022'}</Text>
            <Text
              style={{flex: 1, paddingLeft: 5}}
              className={'normal black textLeft'}>
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};
