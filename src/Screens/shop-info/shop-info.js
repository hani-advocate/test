import React, {useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  GooglePlacesAutocomplete,
  InputIcon,
  PaperInput,
  Text,
  NavigatorBackButton,
} from '@root/Components';
import {Switch} from 'react-native-paper';
import {Colors, CommonStyles} from '@theme/theme';
import Edit from '@svg/edit.svg';
import Dollar from '@svg/dollar-sign.svg';
import Marker from '@svg/marker.svg';
import EmptyImage from '@svg/empty-image.svg';
import {useDispatch, useSelector} from 'react-redux';
import {doUpload, updateMarket} from '@actions/index';
import {strings} from '@root/i18n';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useImagePicker} from '@root/Hooks';
import {defaultMarket} from '@screens/shop-info/market.helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Calender from '@svg/calendar.svg';
import moment from 'moment';
import {PhoneInput} from '@advanced/phone-input';
import {SET_AUTHENTICATED} from '@types/index';
import {HomeRoutes} from '@constants/Routes';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginTop: 12,
    borderRadius: 6,
  },
  inputSwitchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: Colors.black,
    borderWidth: 1,
    color: Colors.black,
    height: 65,
    marginBottom: hp(1.5),
  },
  timePickerContainer: {
    borderRadius: 6,
    backgroundColor: 'white',
    borderColor: Colors.black,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 15,
  },
  timePickerRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default ({navigation, route}) => {
  const {
    me: {market},
  } = useSelector(store => store.User);
  const dispatch = useDispatch();
  const {useDefaultValues, isSetupProcess} = route.params || {};
  const [data, setData] = useState(useDefaultValues ? defaultMarket : market);
  const [isPublished, setIsPublished] = useState(
    useDefaultValues ? false : market.isPublished,
  );
  const {image: coverImage, pickImage: setCoverImage} = useImagePicker();
  const {image: logoImage, pickImage: setLogoImage} = useImagePicker();

  const [activePicker, setActivePicker] = React.useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const showDatePicker = pickerName => {
    setActivePicker(pickerName);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setActivePicker(null);
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    if (activePicker) {
      setData({
        ...data,
        [activePicker]: moment(date),
      });
    }
    hideDatePicker();
  };

  const onSubmit = async () => {
    let logoURL, coverURL;
    if (logoImage) {
      const formData = new FormData();
      formData.append('file', {
        uri: logoImage.uri || logoImage.path,
        name:
          logoImage.fileName ||
          logoImage.path.substring(logoImage.path.lastIndexOf('/') + 1),
        type: logoImage.type,
      });
      logoURL = await doUpload(formData);
    }
    if (coverImage) {
      const formData = new FormData();
      formData.append('file', {
        uri: coverImage.uri || coverImage.path,
        name:
          coverImage.fileName ||
          coverImage.path.substring(coverImage.path.lastIndexOf('/') + 1),
        type: coverImage.type,
      });
      coverURL = await doUpload(formData);
    }
    try {
      const temp = {
        ...data,
        isPublished,
        id: market.id,
        startDeliveryTime: moment(data.startDeliveryTime, 'hh:mm:ss A').format(
          'hh:mm A',
        ),
        endDeliveryTime: moment(data.endDeliveryTime, 'hh:mm:ss A').format(
          'hh:mm A',
        ),
        coverImage:
          coverURL ||
          data.coverImage ||
          'https://upload.wikimedia.org/wikipedia/commons/c/c3/SAS_Supermarket_-_interior-_4.jpg',
        logoImage:
          logoURL ||
          data.logoImage ||
          'https://image.freepik.com/free-vector/supermarket-logo-design-with-shop-tagline_23-2148458443.jpg',
      };
      await dispatch(updateMarket(temp));
      if (isSetupProcess) {
        dispatch({type: SET_AUTHENTICATED, payload: true});
        navigation.navigate(HomeRoutes.ShopHome);
      }
      navigation.goBack();
    } catch (e) {
      console.log({e});
    }
  };

  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSelectAddress = (location, details) => {
    setData({
      ...data,
      address: location.description,
      lat: details.geometry.location.lat,
      lng: details.geometry.location.lng,
      location: {
        type: 'Point',
        coordinates: [
          details.geometry.location.lat,
          details.geometry.location.lng,
        ],
      },
    });
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        keyboardShouldPersistTaps={'handled'}>
        <View style={CommonStyles.content}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <NavigatorBackButton />
            <Text className="price">Market Info</Text>
            <View />
          </View>
          <View style={{flex: 1}}>
            <PaperInput
              left={
                <InputIcon icon={() => <Edit style={{marginRight: wp(2)}} />} />
              }
              defaultValue={data.name}
              placeholder={strings('markets.form.name')}
              label={strings('markets.form.name')}
              onChangeText={text => onChange('name', text)}
            />
            <View style={{marginBottom: hp(2)}}>
              <GooglePlacesAutocomplete
                placeholder={strings('address.placeholder.address')}
                defaultValue={data.address}
                onPick={onSelectAddress}
              />
            </View>
            <PhoneInput
              defaultValue={data.phoneNumber || ''}
              onChange={phone => {
                onChange('phoneNumber', phone.replace(/ /g, ''));
              }}
              value={data.phoneNumber || '+49'}
            />
            {/*<PaperInput*/}
            {/*  left={*/}
            {/*    <InputIcon*/}
            {/*      icon={() => <Phone style={{marginRight: wp(2)}} />}*/}
            {/*    />*/}
            {/*  }*/}
            {/*  defaultValue={data.phoneNumber}*/}
            {/*  placeholder={strings('markets.form.phoneNumber')}*/}
            {/*  label={strings('markets.form.phoneNumber')}*/}
            {/*  onChangeText={(text) => onChange('phoneNumber', text)}*/}
            {/*/>*/}
          </View>
          <View style={styles.inputSwitchContainer}>
            <Text className="normal black">
              {strings('markets.form.publish')}
            </Text>
            <Switch
              value={isPublished}
              onValueChange={() => setIsPublished(!isPublished)}
              color={Colors.pr}
            />
          </View>
          <View style={styles.timePickerRow}>
            <View style={{flex: 1}}>
              <PaperInput
                containerBottomMargin={1}
                value={moment(data.startDeliveryTime, 'hh:mm A').format(
                  'hh:mm A',
                )}
                label={'Delivery Start'}
                onChangeText={() => {}}
                right={
                  <InputIcon
                    icon={() => (
                      <TouchableOpacity
                        onPress={() => showDatePicker('startDeliveryTime')}>
                        <Calender
                          style={{marginRight: 4}}
                          color={Colors.black}
                        />
                      </TouchableOpacity>
                    )}
                  />
                }
              />
            </View>
            <View style={{marginHorizontal: 10}} />
            <View style={{flex: 1}}>
              <PaperInput
                containerBottomMargin={1}
                value={moment(data.endDeliveryTime, 'hh:mm A').format(
                  'hh:mm A',
                )}
                label={'Delivery End'}
                onChangeText={() => {}}
                right={
                  <InputIcon
                    icon={() => (
                      <TouchableOpacity
                        onPress={() => showDatePicker('endDeliveryTime')}>
                        <Calender
                          style={{marginRight: 4}}
                          color={Colors.black}
                        />
                      </TouchableOpacity>
                    )}
                  />
                }
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <PaperInput
              left={
                <InputIcon
                  icon={() => (
                    <Dollar style={{marginRight: wp(2)}} color={Colors.grey} />
                  )}
                />
              }
              defaultValue={(data.minimumOrderCost || '').toString()}
              placeholder={strings('markets.form.minimumOrderCost')}
              label={strings('markets.form.minimumOrderCost')}
              keyboardType={'number-pad'}
              onChangeText={text => onChange('minimumOrderCost', text)}
            />
          </View>
          <View style={{flex: 1, width: '100%'}}>
            <PaperInput
              left={
                <InputIcon
                  icon={() => (
                    <Dollar style={{marginRight: wp(2)}} color={Colors.grey} />
                  )}
                />
              }
              defaultValue={(data.deliveryCost || '').toString()}
              placeholder={strings('markets.form.deliveryCost')}
              label={strings('markets.form.deliveryCost')}
              keyboardType={'number-pad'}
              onChangeText={text => onChange('deliveryCost', text)}
            />
            <PaperInput
              left={
                <InputIcon
                  icon={() => <Marker style={{marginRight: wp(2)}} />}
                />
              }
              defaultValue={(data.maxDeliveryRadius || '').toString()}
              placeholder={strings('markets.form.maxDeliveryRadius')}
              label={strings('markets.form.maxDeliveryRadius')}
              onChangeText={text => onChange('maxDeliveryRadius', text)}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text className="caption textLeft">
              {strings('markets.form.coverImage')}
            </Text>
            <TouchableOpacity onPress={setCoverImage}>
              {data.coverImage || coverImage ? (
                <Image
                  source={{
                    uri: coverImage
                      ? coverImage.path || coverImage.uri
                      : data.coverImage,
                  }}
                  style={styles.image}
                />
              ) : (
                <EmptyImage width={'100%'} height={200} />
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text className="caption textLeft">
              {strings('markets.form.logoImage')}
            </Text>
            <TouchableOpacity onPress={setLogoImage}>
              {data.logoImage || logoImage ? (
                <Image
                  source={{
                    uri: logoImage
                      ? logoImage.path || logoImage.uri
                      : data.logoImage,
                  }}
                  style={styles.image}
                />
              ) : (
                <EmptyImage width={'100%'} height={200} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <Button onPress={() => onSubmit({isPublished: true})}>
              <Text className="bold white">{strings('common.btn.save')}</Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        date={
          data[activePicker]
            ? moment(data[activePicker], 'hh:mm').toDate()
            : new Date()
        }
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};
