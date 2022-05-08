import {Image, View} from 'react-native';
import {Text} from '../Text';
import {Button} from '../Button';
import {PaperInput} from '../PaperInput';
import IBANIcon from '@svg/iban.png';
import {strings} from '@root/i18n';
import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo} from 'react';

export const SEPABottomSheet = ({bottomSheetRef, onSubmit}) => {
  const snapPoints = useMemo(() => ['1%', '100%'], []);
  const [SEPAData, setSEPAData] = React.useState({
    iban: 'DE89370400440532013000',
    accountHolderName: '',
  });
  const handleSheetChanges = useCallback(
    (index) => {
      if (index === 0) {
        bottomSheetRef?.current?.close();
      }
    },
    [bottomSheetRef],
  );

  const onChange = (key, value) => {
    setSEPAData({
      ...SEPAData,
      [key]: value,
    });
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      style={{}}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View
        style={[
          {
            paddingTop: 20,
            flex: 1,
            backgroundColor: '#f7fafc',
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{paddingHorizontal: 20}}>
          <PaperInput
            label={'Account Holder Name'}
            onChangeText={(text) => {
              onChange('accountHolderName', text);
            }}
          />
          <PaperInput
            defaultValue={'DE89370400440532013000'}
            label={'IBAN'}
            onChangeText={(text) => onChange('iban', text)}
            left={() => (
              <Image source={IBANIcon} style={{width: 30, height: 30}} />
            )}
          />
          <Text className="black" style={{fontSize: 16, textAlign: 'justify'}}>
            {strings('subscriptions.sepa_mandate')}
          </Text>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <Button
            onPress={() => {
              onSubmit(SEPAData);
            }}>
            <Text className="bold white" style={{letterSpacing: 1.5}}>
              {strings('common.btn.subscribe')}
            </Text>
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
};
