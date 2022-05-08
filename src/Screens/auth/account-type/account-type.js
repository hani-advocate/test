import React, {useState} from 'react';
import {Button, Text} from '@root/Components';
import SafeAreaView from 'react-native-safe-area-view';
import {TouchableOpacity, View} from 'react-native';
import {strings} from '@root/i18n';
import {CommonStyles, SPACE} from '@theme/styles';
import {accountTypeStyles} from './account-type.styles';
import ShopOwnerTypeIcon from '@svg/showowner-type.svg';
import CustomerTypeIcon from '@svg/customer-type.svg';
import ActiveShopOwnerTypeIcon from '@svg/selected-shopowner-type.svg';
import ActiveCustomerTypeIcon from '@svg/selected-customer-type.svg';
import {useDispatch} from 'react-redux';
import {AuthRoutes} from '@constants/Routes';
import {UPDATE_PROFILE} from '@types/index';

export const AccountType = ({navigation}) => {
  const [type, setType] = useState(undefined);
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch({type: UPDATE_PROFILE, payload: {user: {role: type}}});
    return navigation.navigate(AuthRoutes.Signup, {role: type});
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={CommonStyles.content}>
        <View style={accountTypeStyles.header}>
          <Text
            className="header red"
            style={[accountTypeStyles.headerText]}>
            {strings('accountType.title')}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
            paddingTop: SPACE * 4,
          }}>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[accountTypeStyles.box(type === 'shopOwner')]}
              onPress={() => setType('shopOwner')}>
              <View style={{flex: 1}}>
                {type === 'shopOwner' ? (
                  <ActiveShopOwnerTypeIcon />
                ) : (
                  <ShopOwnerTypeIcon />
                )}
              </View>
              <View
                style={{
                  flex: 2.8,
                  alignItems: 'flex-start',
                }}>
                <Text
                  className={`header ${type === 'shopOwner' ? 'red' : 'black'}`}
                  style={{marginBottom: 10}}>
                  {'Shop Owner'}
                </Text>
                <Text className="normal black textLeft">
                  {'You already have a shop and want to marketplace'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[accountTypeStyles.box(type === 'customer')]}
              onPress={() => setType('customer')}>
              <View style={{flex: 1}}>
                {type === 'customer' ? (
                  <ActiveCustomerTypeIcon />
                ) : (
                  <CustomerTypeIcon />
                )}
              </View>
              <View
                style={{
                  flex: 3,
                  alignItems: 'flex-start',
                }}>
                <Text
                  className={`header ${type === 'customer' ? 'red' : 'black'}`}
                  style={{marginBottom: 10}}>
                  {'Customer'}
                </Text>
                <Text className="normal black textLeft">
                  {'We need something to tell the customer here!'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={CommonStyles.submitButtonContainer}>
            <Button onPress={onSubmit} mode={type ? 'default' : 'disabled'}>
              <Text className="bold white">
                {strings('common.btn.continue')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
