import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Keyboard,
} from 'react-native';
import {Colors, CommonStyles, SPACE} from '@theme/theme';
import {EditProduct} from './edit-product';
import {AddProduct} from './add-product';
import {usePromiseTracker} from 'react-promise-tracker';
import {Spinner} from '@root/Components';
import {strings} from '@root/i18n';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {SHOW_SNACKBAR} from '@root/ActionsTypes';
import {addToMenu} from '@root/Actions';
import {HomeRoutes} from '@root/Constants/Routes';
const productSchema = yup.object().shape({
  categoryId: yup.number().required(),
  itemId: yup.number().required(),
  price: yup.number().required(),
});

const ProductForm = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {me} = useSelector(store => store.User);
  const {item: itemParam, editMode} = route.params || {};
  const {promiseInProgress} = usePromiseTracker({area: 'add-to-menu'});

  const onSubmit = async product => {
    if (!(await productSchema.isValid(product))) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {message: strings('errors.invalidForm')},
      });
      return;
    }
    await dispatch(addToMenu(me.market.id, product));
    navigation.navigate(HomeRoutes.ShopHome, {forceRefresh: true});
  };

  if (promiseInProgress) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.content}>
          <View style={{flex: 1}}>
            {editMode && !!itemParam ? (
              <EditProduct item={itemParam} onSubmit={onSubmit} />
            ) : (
              <AddProduct onSubmit={onSubmit} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    paddingTop: 12,
  },
  pickerContainer: isError => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: isError ? Colors.pr : Colors.grey,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 16,
  }),
  dropDownStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderRadius: 50,
    ...CommonStyles.shadow,
  },
  pickerActiveLabelStyle: {
    color: Colors.pr,
  },
  pickerItem: {
    justifyContent: 'flex-start',
    height: 50,
  },
  pickerStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.black,
  },
  pickerContainerStyle: {
    height: 55,
    marginBottom: 20,
  },
  tableContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: SPACE,
    marginBottom: SPACE * 5,
    borderRadius: SPACE,
    paddingHorizontal: SPACE,
    paddingVertical: SPACE,
    ...CommonStyles.shadow,
  },
});

export default ProductForm;
