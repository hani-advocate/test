import {Image, TouchableOpacity, View} from 'react-native';
import {subscriptionsTypesStyles} from '@root/subscriptions-types.styles';
import {Text} from '@root/Components';
import {strings} from '@root/i18n';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

export const SubscriptionPlansList = ({data, selected, setSelected}) => {
  return (
    <ScrollView style={{flex: 1}}>
      {data?.map((item, index) => (
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
            <Text className="normal dark textLeft">
              {strings(`subscriptions.methods.${item.paymentMethod}.desc`)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
