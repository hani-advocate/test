import React, {useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View} from 'react-native';
import {Button, InputIcon, PaperInput, Text} from '@root/Components';
import Email from '@svg/email.svg';
import {CommonStyles, SPACE} from '@theme/styles';
import {strings} from '@root/i18n';
import Person from '@svg/person.svg';
import Visible from '@svg/visible.svg';
import Invisible from '@svg/invisible.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {createAssistant} from '@actions/index';
import * as yup from 'yup';
import {SHOW_SNACKBAR} from '@types/index';
import {PhoneInput} from '@advanced/phone-input';

const newAssistantSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  phoneNumber: yup.string().required(),
});

export default ({navigation}) => {
  const dispatch = useDispatch();
  const [isSecure, setIsSecure] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '+49',
    password: '',
  });

  const onSubmit = async () => {
    try {
      const isOk = await newAssistantSchema.validate(data).catch((errors) => {
        console.log({errors});
      });
      if (isOk) {
        await dispatch(createAssistant(data));
        navigation.goBack();
      } else {
        dispatch({
          type: SHOW_SNACKBAR,
          payload: {message: strings('errors.submit')},
        });
      }
    } catch (e) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {message: strings('errors.submit')},
      });
    }
  };

  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
    setError(false);
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View
        style={[
          CommonStyles.content,
          {
            marginTop: SPACE,
            justifyContent: 'space-between',
            flex: 1,
          },
        ]}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
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
        </KeyboardAwareScrollView>
        <View>
          <Button style={{marginBottom: SPACE * 2}} onPress={onSubmit}>
            <Text className="bold white">{strings('common.btn.save')}</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
