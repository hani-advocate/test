import React, {useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  GooglePlacesAutocomplete,
  InputIcon,
  PaperInput,
  Text,
} from '@root/Components';
import Edit from '@svg/edit.svg';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '@actions/index';
import {strings} from '@root/i18n';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors, CommonStyles} from '@theme/theme';
import {PhoneInput} from '@advanced/phone-input';

const PersonalInfoScreen = ({navigation}) => {
  const {me} = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const [data, setData] = useState({...me, email: undefined});
  const [Error, setError] = useState(undefined);
  const onSubmit = async () => {
    const {error} = await dispatch(updateProfile(data));
    if (!error) {
      navigation.goBack();
    } else {
      setError(error);
    }
  };

  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
    setError(undefined);
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
      <View style={CommonStyles.content}>
        {Error && (
          <Text className={'red'} style={{marginBottom: hp(1)}}>
            {strings(`errors.${Error.message}`)}
          </Text>
        )}
        <View style={{flex: 1}}>
          <PaperInput
            label={strings('users.form.firstName')}
            placeholder={strings('users.form.firstName')}
            onChangeText={(text) => onChange('firstName', text)}
            defaultValue={data.firstName}
            left={
              <InputIcon icon={() => <Edit style={{marginRight: wp(2)}} />} />
            }
          />
          <PaperInput
            label={strings('users.form.lastName')}
            placeholder={strings('users.form.lastName')}
            onChangeText={(text) => onChange('lastName', text)}
            defaultValue={data.lastName}
            left={
              <InputIcon icon={() => <Edit style={{marginRight: wp(2)}} />} />
            }
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
            error={Error && !data.addressLine1}
            placeholder={strings('address.placeholder.address')}
            containerStyle={{
              marginBottom: hp(3),
              backgroundColor: Colors.bg,
            }}
            defaultValue={data.address}
          />
        </View>
      </View>
      <View style={{marginBottom: 20, paddingHorizontal: 16}}>
        <Button onPress={onSubmit}>
          <Text className="bold white">{strings('common.btn.save')}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;
