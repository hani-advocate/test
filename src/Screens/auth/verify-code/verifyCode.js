import React, {useState} from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {VerificationCodeStyles} from './styles';
import {Button, Text} from '@root/Components';
import {ConfirmationField} from '@advanced/index';
import {AuthRoutes, HomeRoutes, MainRoutes} from '@constants/Routes';
import {navigate} from '../../../../NavigationService';
import {useDispatch} from 'react-redux';
import {verifyCode} from '@actions/index';
import {strings} from '@root/i18n';
import {SHOW_SNACKBAR} from '@types/index';
import {CommonStyles, SPACE} from '@theme/styles';
import {accountTypeStyles} from '@screens/auth/account-type/account-type.styles';

const VerifyCode = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {phoneNumber = '+963958446790', type = 'verifyCode'} =
    route.params || {};
  const [code, setCode] = useState('');

  const onSubmit = async () => {
    try {
      const {shouldContinue} = await dispatch(
        verifyCode({code, phoneNumber, type}),
      );
      console.log({shouldContinue});
      if (shouldContinue && type === 'verifyCode') {
        navigate(AuthRoutes.SubscriptionPlans);
      } else if (type === 'resetPasswordToken') {
        navigate(AuthRoutes.ResetPassword, {code, phoneNumber});
      }
    } catch (e) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {message: strings('verificationCode.invalidCode')},
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
              {strings('verificationCode.title')}
            </Text>
          </View>
          <View style={{justifyContent: 'space-between', flex: 1}}>
            <View style={{flex: 1}}>
              <Text
                className="caption black textLeft"
                style={{marginBottom: SPACE * 1.5}}>
                {strings('verificationCode.body')}
                <Text className="caption bold black">{` ${phoneNumber}`}</Text>
              </Text>
              <ConfirmationField onValueChange={setCode} />
              <TouchableOpacity onPress={() => navigate(AuthRoutes.Login)}>
                <Text className="caption black textLeft">
                  {strings('verificationCode.resendCodeMessage')}
                  <Text className="bold red">{`  ${strings(
                    'verificationCode.resendBtn',
                  )}`}</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={CommonStyles.submitButtonContainer}>
              <Button
                onPress={onSubmit}
                mode={
                  code !== '' && code.length === 4 ? 'default' : 'disabled'
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

export default VerifyCode;
