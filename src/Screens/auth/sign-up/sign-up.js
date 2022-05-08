import * as yup from 'yup';
import {
  Button,
  GooglePlacesAutocomplete,
  InputIcon,
  PaperInput,
  Text,
} from '@root/Components';
import {Colors, CommonStyles, SPACE} from '@theme/theme';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {AuthRoutes} from '@constants/Routes';
import Email from '@svg/email.svg';
import Invisible from '@svg/invisible.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Person from '@svg/person.svg';
import {SHOW_SNACKBAR} from '@types/index';
import SafeAreaView from 'react-native-safe-area-view';
import Visible from '@svg/visible.svg';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {navigate} from '../../../../NavigationService';
import {register as registerUser} from '@actions/index';
import {signupStyles} from './styles';
import {strings} from '@root/i18n';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {PhoneInput} from '@advanced/phone-input';

const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  phoneNumber: yup.string().required(),
});

const SignUp = ({}) => {
  const role = 'shopOwner';
  const navigation = useNavigation();
  const [isSecure, setIsSecure] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '+49',
    // +963991437110
  });
  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
    setError(false);
  };

  const isValid = () => {
    try {
      registerSchema.validateSync(data);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isValidateData = () => {
    const isOK = isValid();
    if (!isOK) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {message: strings('errors.submit')},
      });
      setError(true);
    }
    return isOK;
  };

  // const isValidCredentials = async () => {
  //   let isValid = false;
  //   try {
  //     await API.checkRegisterCredentials({user: {...data, role}});
  //     isValid = true;
  //     return true;
  //   } catch (e) {
  //     const {code} = e;
  //     console.log(e);
  //     dispatch({
  //       type: SHOW_SNACKBAR,
  //       payload: {message: strings(`errors.${code}`)},
  //     });
  //     return false;
  //   }
  // };

  const onSubmit = async () => {
    if (!isValidateData()) {
      return;
    }
    try {
      const user = {...data, role};
      const isOK = await dispatch(registerUser({user}));
      if (isOK) {
        navigation.navigate(AuthRoutes.VerifyCode, {
          phoneNumber: data.phoneNumber,
          type: 'verifyCode',
        });
      }
    } catch (e) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {message: 'Phone number is already exit'},
      });
    }
  };

  const onPickNewPlace = (location, details) => {
    setData({
      ...data,
      location: details.geometry.location,
      address: location.description,
    });
    setError(false);
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={[CommonStyles.content]}>
        <View style={signupStyles.header}>
          <Text className="header red" style={signupStyles.headerText}>
            {strings('register.title')}
          </Text>
        </View>
        <View style={{flex: 1, marginBottom: hp(1)}}>
          <PaperInput
            error={error && !data.firstName}
            defaultValue={data.firstName}
            label={strings('register.placeholder.firstName')}
            placeholder={strings('register.placeholder.firstName')}
            onChangeText={(text) => onChange('firstName', text)}
            left={
              <InputIcon icon={() => <Person style={{marginRight: 4}} />} />
            }
          />
          <PaperInput
            error={error && !data.lastName}
            defaultValue={data.lastName}
            label={strings('register.placeholder.lastName')}
            placeholder={strings('register.placeholder.lastName')}
            onChangeText={(text) => onChange('lastName', text)}
            left={
              <InputIcon icon={() => <Person style={{marginRight: 4}} />} />
            }
          />
          <PaperInput
            error={error && !data.email}
            defaultValue={data.email}
            label={strings('register.placeholder.email')}
            placeholder={strings('register.placeholder.email')}
            onChangeText={(text) => onChange('email', text)}
            keyboardType={'email-address'}
            left={<InputIcon icon={() => <Email style={{marginRight: 4}} />} />}
          />
          <PhoneInput
            defaultValue={data.phoneNumber}
            onChange={(phone) => {
              onChange('phoneNumber', phone.replace(/ /g, ''));
            }}
            value={data.phoneNumber}
          />
          <GooglePlacesAutocomplete
            onPick={onPickNewPlace}
            error={error && !data.addressLine1}
            placeholder={strings('address.placeholder.address')}
            containerStyle={{
              marginBottom: 10,
              backgroundColor: Colors.bg,
            }}
          />
          <PaperInput
            error={error && !data.password}
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
        <Button
          onPress={onSubmit}
          style={{marginBottom: SPACE}}
          mode={isValid(data) ? 'default' : 'disabled'}>
          <Text className="white bold">{strings('common.btn.continue')}</Text>
        </Button>
        <TouchableOpacity onPress={() => navigate(AuthRoutes.Login)}>
          <Text className="caption black">
            {strings('register.haveAccount')}
            <Text className="bold red">{`  ${strings(
              'common.btn.login',
            )}`}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
