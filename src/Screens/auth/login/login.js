import React, {useContext, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import styles from './styles';
import {Button, InputIcon, PaperInput, Text} from '@root/Components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AuthRoutes} from '@constants/Routes';
import * as yup from 'yup';
import 'yup-phone';
import {useDispatch} from 'react-redux';
import {logIn} from '@actions/index';
import {navigate} from '../../../../NavigationService';
import {strings} from '@root/i18n';
import Tarboush from '@svg/tarboush.svg';
import Visible from '@svg/visible.svg';
import Invisible from '@svg/invisible.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {CommonStyles} from '@theme/styles';
import {PhoneInput} from '@advanced/phone-input';
import {modalActionTypes, modalModes} from '@constants/Utils';
import {ModalContext} from '@advanced/Modal';
import {removeAuthToken, setAuthToken} from '@root/APIs';
import {LOGIN, SET_AUTHENTICATED} from '@types/index';
import api from '@api/Auth.api';

const loginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .phone(undefined, false, 'invalidPhoneNumber')
    .required('phoneNumberRequired'),
  password: yup.string().required('passwordRequired'),
});

const Login = ({navigation}) => {
  const [isSecure, setIsSecure] = useState(true);
  const dispatch = useDispatch();
  const [, setModal] = useContext(ModalContext);
  const [data, setData] = useState({
    phoneNumber: '+49',
    password: '',
  });
  const [error, setError] = useState(false);
  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
    setError(false);
  };
  const onSubmit = async () => {
    try {
      if (await loginSchema.validate(data)) {
        const {user, token} = await api.login(data);
        await setAuthToken(token);
        dispatch({type: LOGIN, payload: {user}});

        if (user.role === 'customer') {
          setModal({
            type: modalActionTypes.SET,
            payload: {
              mode: modalModes.CHANGE_ROLE,
              primary: {
                text: strings('common.btn.continue'),
                action: () => {
                  navigation.navigate(AuthRoutes.SubscriptionPlans, {
                    useDefaultValues: true,
                  });
                },
              },
              secondary: {
                text: strings('common.btn.cancel'),
                action: async () => {
                  await removeAuthToken();
                  navigation.navigate(AuthRoutes.Welcome);
                },
              },
            },
          });
        } else {
          await setAuthToken(token);
          dispatch({type: SET_AUTHENTICATED, payload: true});
          navigation.navigate(
            !user.isSubscribed
              ? AuthRoutes.SubscriptionPlans
              : AuthRoutes.ShopInfo,
            {useDefaultValues: true},
          );
        }
      }
    } catch (e) {
      if (e.message) {
        console.log(e, e.message);
        console.tron(e.message);
        setError(e);
      }
    }
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'handled'}>
        <Tarboush style={{marginBottom: hp('2%')}} />
        <Text className="header red" style={styles.headerText}>
          {strings('login.title')}
        </Text>
        {error && (
          <Text className={'red'} style={{marginBottom: hp(1)}}>
            {strings(`errors.${error.message}`)}
          </Text>
        )}
        <View style={{width: '100%'}}>
          <PhoneInput
            onChange={(phone) => {
              onChange('phoneNumber', phone.replace(/ /g, ''));
            }}
            value={data.phoneNumber}
          />

          <PaperInput
            defaultValue={data.password}
            label={strings('common.placeholder.password')}
            placeholder={strings('common.placeholder.password')}
            onChangeText={(text) => onChange('password', text)}
            right={
              <InputIcon
                icon={() => (isSecure ? <Visible /> : <Invisible />)}
                hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                onPress={() => setIsSecure(!isSecure)}
              />
            }
            secureTextEntry={isSecure}
          />
        </View>
        <Button onPress={onSubmit}>
          <Text className="white bold">{strings('common.btn.login')}</Text>
        </Button>
        <TouchableOpacity onPress={() => navigate(AuthRoutes.ForgetPassword)}>
          <Text
            className="red bold"
            style={{marginBottom: 20, lineHeight: hp(3), fontSize: wp(4.5)}}>
            {strings('login.forgetPassword')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate(AuthRoutes.AccountType)}>
          <Text
            className="caption black"
            style={{lineHeight: hp(3.2), fontSize: wp(4.5)}}>
            {strings('login.noAccount')}
            <Text className="caption bold red">
              {' ' + strings('login.signup')}
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
