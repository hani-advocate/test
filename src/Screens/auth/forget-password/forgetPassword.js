import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {Button, Text} from '@root/Components';
import {AuthRoutes} from '@constants/Routes';
import {navigate} from '../../../../NavigationService';
import {useDispatch} from 'react-redux';
import {forgetPassword} from '@actions/index';
import {strings} from '@root/i18n';
import {SHOW_SNACKBAR} from '@types/index';
import {CommonStyles, SPACE} from '@theme/styles';
import {accountTypeStyles} from '@screens/auth/account-type/account-type.styles';
import {VerificationCodeStyles} from '@screens/auth/verify-code/styles';
import {PhoneInput} from '@advanced/phone-input';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('+49');
  const onSubmit = async () => {
    if (phoneNumber) {
      const res = await dispatch(forgetPassword({phoneNumber}));
      if (res) {
        navigate(AuthRoutes.VerifyCode, {
          phoneNumber,
          type: 'resetPasswordToken',
        });
      }
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          message: res
            ? strings('forgetPassword.notifications.success')
            : strings('forgetPassword.notifications.error'),
        },
      });
    }
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={CommonStyles.content}>
          <View style={accountTypeStyles.header}>
            <Text
              className="header red"
              style={VerificationCodeStyles.headerText}>
              {strings('forgetPassword.title')}
            </Text>
          </View>
          <View style={{justifyContent: 'space-between', flex: 1}}>
            <View style={{flex: 1}}>
              <Text className="" style={{marginBottom: SPACE * 2.4}}>
                {strings('forgetPassword.body')}
              </Text>
              <View style={{flex: 1, width: '100%'}}>
                <PhoneInput
                  onChange={(phone) => {
                    setPhoneNumber(phone.replace(/ /g, ''));
                  }}
                  value={phoneNumber}
                />
              </View>
            </View>
            <View style={CommonStyles.submitButtonContainer}>
              <Button
                onPress={onSubmit}
                mode={
                  phoneNumber && phoneNumber.length > 6 ? 'default' : 'disabled'
                }>
                <Text className="bold white">{strings('common.btn.send')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ForgetPassword;
