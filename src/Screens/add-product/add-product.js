/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, InputIcon, PaperInput, Text} from '@root/Components';
import Dollar from '@svg/dollar-sign.svg';
import {Colors, CommonStyles, SPACE} from '@theme/theme';
import {isRTL, strings} from '@root/i18n';
import api from '@api/Markets.api';
import {Divider} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDebouncedCallback} from 'use-debounce';

export const AddProduct = ({onSubmit}) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [item, setItem] = useState({});
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState('1');

  const getCategories = useCallback(async search => {
    const {data} = await api.getAllCategories(search);
    const temp = (data || []).map(i => ({
      label: i.name,
      value: i.id,
    }));
    setCategories(temp);
  }, []);

  const itemSearchDebounced = useDebouncedCallback(async value => {
    if (category) {
      const {data} = await api.getAvailableItemsByCategory(
        category.value,
        value,
      );
      const temp = data.map(i => ({
        label: `${i.name} - ${i.brand.name} - (${i.weight} ${i.unit})`,
        value: i.id,
      }));
      setItems(() => [...temp]);
    }
  }, 300);

  // on category selected
  useEffect(() => {
    if (category && category.value) {
      setItem(null);
      itemSearchDebounced('');
    }
  }, [category]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View>
        <DropDownPicker
          items={categories || []}
          labelStyle={{textAlign: 'left'}}
          containerStyle={styles.pickerContainerStyle}
          placeholder={strings('common.btn.pickCategory')}
          style={[styles.pickerStyle]}
          itemStyle={styles.pickerItem}
          activeLabelStyle={styles.pickerActiveLabelStyle}
          renderSeperator={() => <Divider />}
          onChangeItem={setCategory}
          arrowSize={25}
          dropDownMaxHeight={400}
          dropDownStyle={styles.dropDownStyle}
          zIndex={500}
        />

        <DropDownPicker
          items={items}
          containerStyle={[styles.pickerContainerStyle]}
          style={styles.pickerStyle}
          labelStyle={{textAlign: 'left'}}
          placeholder={strings('common.btn.pickItem')}
          itemStyle={[styles.pickerItem]}
          activeLabelStyle={styles.pickerActiveLabelStyle}
          renderSeperator={() => <Divider />}
          onChangeItem={setItem}
          arrowSize={25}
          dropDownMaxHeight={400}
          dropDownStyle={[styles.dropDownStyle]}
          searchable={true}
          searchablePlaceholder={strings('common.btn.searchForItem')}
          searchablePlaceholderTextColor={Colors.black}
          searchableStyle={[
            {
              backgroundColor: Colors.white,
              textAlign: isRTL ? 'right' : 'left',
              height: 50,
            },
          ]}
          searchableError={() => <Text>{'Not Found'}</Text>}
          onSearch={text => {
            itemSearchDebounced(text);
          }}
          zIndex={400}
        />
        <PaperInput
          error={!price}
          left={
            isRTL ? null : (
              <InputIcon
                icon={() => <Dollar color={Colors.grey} width={20} />}
              />
            )
          }
          right={
            isRTL ? (
              <InputIcon
                icon={() => <Dollar color={Colors.grey} width={20} />}
              />
            ) : null
          }
          helperText={'Price is required'}
          defaultValue={price.toString()}
          keyboardType={'number-pad'}
          maxLength={12}
          onChangeText={setPrice}
          label={strings('common.price')}
        />
      </View>
      <View style={[CommonStyles.submitButtonContainer, {marginBottom: -12}]}>
        <Button
          mode={!price ? 'disabled' : 'default'}
          onPress={() => {
            console.log({item, category, price});
            onSubmit({
              itemId: item.value,
              categoryId: category.value,
              price: parseInt(price, 10),
            });
          }}>
          <Text className="bold white">{strings('common.btn.addToMenu')}</Text>
        </Button>
      </View>
    </View>
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

export default AddProduct;
