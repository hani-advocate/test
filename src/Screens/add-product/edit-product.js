import React from 'react';
import {List} from 'react-native-paper';
import {Colors, CommonStyles} from '@theme/theme';
import {Button, InputIcon, PaperInput, Text} from '@root/Components';
import {View, Platform} from 'react-native';
import {isRTL, strings} from '@root/i18n';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Dollar from '@svg/dollar-sign.svg';

export const EditProduct = ({item, onSubmit}) => {
  const [price, setPrice] = React.useState(item.price);

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View>
        <View style={{marginHorizontal: -12, marginBottom: 0}}>
          <List.Item
            titleStyle={{
              color: Colors.black,
              fontFamily: Platform.select({
                ios: 'Roboto',
                android: 'Roboto-Bold',
              }),
              fontWeight: '600',
              fontSize: wp(4),
            }}
            title={strings('common.category')}
            description={item.category.name}
            descriptionStyle={{
              color: Colors.black,
              fontSize: wp(3.5),
              paddingTop: 10,
            }}
          />
          <List.Item
            titleStyle={{
              color: Colors.black,
              fontFamily: Platform.select({
                ios: 'Roboto',
                android: 'Roboto-Bold',
              }),
              fontWeight: '600',
              fontSize: wp(4),
            }}
            title={strings('common.item')}
            description={`${item.name} - ${item.brand.name} - (${item.weight} ${item.unit})`}
            descriptionStyle={{
              color: Colors.black,
              fontSize: wp(3.5),
              paddingTop: 10,
            }}
          />
        </View>
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
          onChangeText={setPrice}
          label={strings('common.price')}
        />
      </View>
      <View style={[CommonStyles.submitButtonContainer, {marginBottom: -12}]}>
        <Button
          onPress={() => {
            price &&
              onSubmit({
                ...item,
                price: parseInt(price, 10),
              });
          }}>
          <Text className="bold white">{strings('common.btn.updateMenu')}</Text>
        </Button>
      </View>
    </View>
  );
};
