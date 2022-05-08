import React from 'react';
import {View} from 'react-native';

import CountryPickerModal from 'react-native-country-picker-modal';
import {InputIcon, PaperInput} from '@root/Components';
import {strings} from '@root/i18n';
import {AsYouType} from 'libphonenumber-js';

export const PhoneInput = ({value, defaultValue = '+49', onChange}) => {
  const [country, setCountry] = React.useState({
    callingCode: ['49'],
    cca2: 'DE',
    currency: ['EUR'],
    flag: 'flag-de',
    name: 'Germany',
    region: 'Europe',
    subregion: 'Western Europe',
  });
  const [pickerVisible, setPickerVisible] = React.useState(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{flex: 1}}>
        <PaperInput
          defaultValue={defaultValue}
          label={strings('register.placeholder.phoneNumber')}
          placeholder={strings('register.placeholder.phoneNumber')}
          onChangeText={(text) => {
            onChange(text);
          }}
          value={new AsYouType(country?.cca2).input(value)}
          keyboardType={'phone-pad'}
          left={
            <InputIcon
              style={{}}
              icon={() => (
                <CountryPickerModal
                  onSelect={(item) => {
                    setCountry(item);
                    onChange(`+${item.callingCode[0]}`);
                  }}
                  withFlagButton={true}
                  countryCode={country?.cca2}
                  withFilter={true}
                  modalProps={{visible: pickerVisible}}
                  onClose={() => setPickerVisible(false)}
                  onOpen={() => setPickerVisible(true)}
                />
              )}
            />
          }
        />
      </View>
    </View>
  );
};
