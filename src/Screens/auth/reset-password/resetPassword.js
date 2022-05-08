import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {Button, InputIcon, PaperInput, Text} from '@root/Components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AuthRoutes} from '@constants/Routes';
import * as yup from 'yup';
import {navigate} from '../../../../NavigationService';
import {strings} from '@root/i18n';
import {useDispatch} from 'react-redux';
import {resetPassword} from '@actions/index';
import Visible from '@svg/visible.svg';
import Invisible from '@svg/invisible.svg';
import {CommonStyles, SPACE} from '@theme/styles';
import {accountTypeStyles} from '@screens/auth/account-type/account-type.styles';
import {VerificationCodeStyles} from '@screens/auth/verify-code/styles';

const resetPasswordSchema = yup.object().shape({
  newPassword: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const ResetPassword = ({route}) => {
  const dispatch = useDispatch();
  const {phoneNumber, code} = route.params || {};
  const [securePW, setSecurePW] = useState(true);
  const [secureCPW, setSecureCPW] = useState(true);
  const [data, setData] = useState();

  const isValid = () => {
    try {
      resetPasswordSchema.validateSync(data);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const onSubmit = async () => {
    const isOK = await resetPasswordSchema.validate(data);
    if (isOK) {
      const res = await dispatch(
        resetPassword({newPassword: data.newPassword, phoneNumber, code}),
      );
      if (res) {
        navigate(AuthRoutes.Login);
      }
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
              <Text className="textLeft" style={{marginBottom: SPACE * 1.5}}>
                {strings('resetPassword.body')}
              </Text>
              <View style={{flex: 1, width: '100%'}}>
                <PaperInput
                  secureTextEntry={securePW}
                  right={
                    <InputIcon
                      icon={() => (securePW ? <Visible /> : <Invisible />)}
                      hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                      onPress={() => setSecurePW(!securePW)}
                    />
                  }
                  label={strings('common.placeholder.password')}
                  onChangeText={(text) => onChange('newPassword', text)}
                />
                <PaperInput
                  secureTextEntry={secureCPW}
                  right={
                    <InputIcon
                      icon={() => (secureCPW ? <Visible /> : <Invisible />)}
                      hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                      onPress={() => setSecureCPW(!secureCPW)}
                    />
                  }
                  label={strings('common.placeholder.confirmPassword')}
                  onChangeText={(text) => onChange('confirmPassword', text)}
                />
              </View>
            </View>
            <View style={CommonStyles.submitButtonContainer}>
              <Button
                onPress={onSubmit}
                mode={isValid() ? 'default' : 'disabled'}>
                <Text className="bold white">{strings('common.btn.send')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ResetPassword;
