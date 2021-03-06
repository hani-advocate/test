import {
  ImagePicker,
  InputIcon,
  PaperInput,
  SubmitButton,
  Spinner,
  PaymentScreenWrapper,
} from '@root/Components';
import {HIDE_SNACKBAR, SHOW_SNACKBAR} from '@types/index';
import {StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {createOrUpdateOffer, doUpload} from '@actions/index';
import {Colors, SCREEN_HEIGHT} from '@theme/theme';
import SafeAreaView from 'react-native-safe-area-view';
import {strings} from '@root/i18n';
import {useDispatch} from 'react-redux';
import {useImagePicker} from '@root/Hooks';
import {usePromiseTracker} from 'react-promise-tracker';
import {useRoute} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import Calender from '@svg/calendar.svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {OffersRoutes} from '@constants/Routes';
import isEmpty from 'lodash/isEmpty';
import {OfferPaymentBanner} from './offer-payment-banner';
import {useStripe, PaymentSheetError} from '@stripe/stripe-react-native';
import {subscriptionAPI} from '@root/APIs/subscriptions.api';
import {sendAccessibilityEvent} from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';

const OfferForm = ({navigation}) => {
  const {
    params: {offer, requirePayment},
  } = useRoute();
  const {promiseInProgress} = usePromiseTracker();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    nameAr: '',
    nameEn: '',
    nameDe: '',
    descriptionAr: '',
    descriptionEn: '',
    descriptionDe: '',
    expiredAt: moment().add(1, 'd'),
  });
  const onChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
    setError(false);
  };
  const {image, pickImage} = useImagePicker();

  useEffect(() => {
    if (!isEmpty(offer)) {
      setData(offer);
    }
  }, [offer]);

  const onSave = async params => {
    await dispatch(createOrUpdateOffer(params));
    navigation.goBack();
  };

  const onSubmit = async () => {
    if (!data.nameAr || !data.nameEn || !data.nameDe) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          message: 'Titles are required fields',
          action: {
            label: strings('common.btn.ok'),
            onPress: () => dispatch({type: HIDE_SNACKBAR}),
          },
        },
      });
      return;
    }
    if (!data.image && !image) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          message: strings('offers.missingImage'),
          action: {
            label: strings('common.btn.ok'),
            onPress: () => dispatch({type: HIDE_SNACKBAR}),
          },
        },
      });
      return;
    }
    let imageLink;
    if (image) {
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri || image.path,
        name:
          image.fileName ||
          image.path.substring(image.path.lastIndexOf('/') + 1),
        type: image.mime || image.type,
      });
      imageLink = await doUpload(formData);
    }
    if (requirePayment && !offer.id) {
      return openPaymentSheet({...data, image: imageLink || data.image});
    }

    try {
      onSave();
    } catch (e) {
      console.log(e);
    }
  };

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setData({
      ...data,
      expiredAt: moment(date),
    });
    hideDatePicker();
  };

  // PAYMENT SHEET

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState();

  const fetchPaymentSheetParams = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await subscriptionAPI.createPayment();
    setClientSecret(paymentIntent);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const openPaymentSheet = async offerData => {
    if (!clientSecret) {
      return;
    }
    setLoading(true);
    const {error} = await presentPaymentSheet();

    if (!error) {
      Alert.alert('Success', 'The payment was confirmed successfully');
      onSave(offerData);
    } else if (error.code === PaymentSheetError.Failed) {
      Alert.alert(
        `PaymentSheet present failed with error code: ${error.code}`,
        error.message,
      );
    } else if (error.code === PaymentSheetError.Canceled) {
      Alert.alert(
        `PaymentSheet present was canceled with code: ${error.code}`,
        error.message,
      );
    }
    setPaymentSheetEnabled(false);
    setLoading(false);
  };

  const initialisePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    const address = {
      city: 'San Francisco',
      country: 'AT',
      line1: '510 Townsend St.',
      line2: '123 Street',
      postalCode: '94102',
      state: 'California',
    };
    const billingDetails = {
      name: 'Jane Doe',
      email: 'foo@bar.com',
      phone: '555-555-555',
      address: address,
    };

    const {error} = await initPaymentSheet({
      currencyCode: 'eur',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      customFlow: false,
      merchantDisplayName: 'Yalla Liefer',
      applePay: true,
      merchantCountryCode: 'DE',
      style: 'automatic',
      googlePay: true,
      testEnv: true,
      primaryButtonColor: Colors.pr,
      defaultBillingDetails: billingDetails,
      allowsDelayedPaymentMethods: true,
    });

    if (!error) {
      setPaymentSheetEnabled(true);
    } else if (error.code === PaymentSheetError.Failed) {
      Alert.alert(
        `PaymentSheet init failed with error code: ${error.code}`,
        error.message,
      );
    } else if (error.code === PaymentSheetError.Canceled) {
      Alert.alert(
        `PaymentSheet init was canceled with code: ${error.code}`,
        error.message,
      );
    }
  };

  if (promiseInProgress) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        keyboardShouldPersistTaps={'handled'}>
        <PaymentScreenWrapper onInit={initialisePaymentSheet}>
          <View style={styles.content}>
            <OfferPaymentBanner />
            <PaperInput
              error={error && !data.nameAr}
              defaultValue={offer.nameAr}
              label={strings('offers.form.nameAr')}
              placeholder={strings('offers.placeholder.nameAr')}
              onChangeText={text => onChange('nameAr', text)}
            />
            <PaperInput
              error={error && !data.nameDe}
              defaultValue={offer.nameDe}
              label={strings('offers.form.nameDe')}
              placeholder={strings('offers.placeholder.nameDe')}
              onChangeText={text => onChange('nameDe', text)}
            />
            <PaperInput
              error={error && !data.nameEn}
              defaultValue={offer.nameEn}
              label={strings('offers.form.nameEn')}
              placeholder={strings('offers.placeholder.nameEn')}
              onChangeText={text => onChange('nameEn', text)}
            />
            <PaperInput
              value={moment(data.expiredAt).format('lll')}
              label={strings('offers.placeholder.expiredAt')}
              onChangeText={() => {}}
              right={
                <InputIcon
                  icon={() => (
                    <TouchableOpacity
                      onPress={() => setDatePickerVisibility(true)}>
                      <Calender style={{marginRight: 4}} color={Colors.black} />
                    </TouchableOpacity>
                  )}
                />
              }
            />
            <PaperInput
              multiline
              defaultValue={offer.descriptionAr}
              label={strings('offers.form.descriptionAr')}
              numberOfLines={3}
              height={SCREEN_HEIGHT / 10}
              onChangeText={text => onChange('descriptionAr', text)}
            />
            <PaperInput
              multiline
              defaultValue={offer.descriptionDe}
              label={strings('offers.form.descriptionDe')}
              numberOfLines={3}
              height={SCREEN_HEIGHT / 10}
              onChangeText={text => onChange('descriptionDe', text)}
            />
            <PaperInput
              multiline
              defaultValue={offer.descriptionEn}
              label={strings('offers.form.descriptionEn')}
              numberOfLines={3}
              height={SCREEN_HEIGHT / 10}
              onChangeText={text => onChange('descriptionEn', text)}
            />
            <ImagePicker
              image={offer.image || image}
              isRequired={true}
              pickImage={pickImage}
              label="offers.form.image"
            />
            <SubmitButton
              // disabled={openPaymentSheet}
              onPress={onSubmit}
              title={`offers.btn.${
                offer.id ? 'update' : requirePayment ? 'saveAndPay' : 'addNew'
              }`}
            />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            date={moment(data.expiredAt).toDate()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </PaymentScreenWrapper>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 16,
  },
  saveBtn: {
    position: 'absolute',
    bottom: 20,
    left: 26,
    right: 26,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 12,
    borderRadius: 6,
  },
  paperInput: {
    fontSize: wp(3.5),
  },
});

export default OfferForm;
export {OfferForm};
