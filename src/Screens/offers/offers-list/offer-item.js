import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@root/Components';
import {useDimensions} from '@react-native-community/hooks';
import {navigateToMarket} from '@actions/index';
import {useNavigation} from '@react-navigation/native';
import {BottomTabsRoutes, HomeRoutes, OffersRoutes} from '@constants/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {Menu} from 'react-native-paper';
import {strings} from '@root/i18n';
import Icon from 'react-native-vector-icons/Feather';

import {useIsShop} from '@root/Utils';
import {Colors} from '@theme/colors';

const OfferItem = ({offer = {}}) => {
  const {width} = useDimensions().window;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isShopOwner = useIsShop();
  const {market} = useSelector((store) => store.User.me);
  const onPress = async () => {
    await dispatch(navigateToMarket(offer.market));
    navigation.navigate(BottomTabsRoutes.Home, {screen: HomeRoutes.Market});
  };
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.item}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Image
          source={{uri: offer.image}}
          style={{...styles.image, height: width / 2.7}}
          resizeMethod="resize"
          resizeMode={'cover'}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <View style={{flex: 1, paddingHorizontal: 12}}>
          {offer?.name !== '' ? (
            <Text className="caption dark" style={{textAlign: 'left'}}>
              {offer.name}
            </Text>
          ) : null}

          {offer?.description !== '' ? (
            <Text
              className="smallSz"
              style={{textAlign: 'left'}}
              numberOfLines={3}>
              {offer.description}
            </Text>
          ) : null}
        </View>
        {isShopOwner && market.id === offer.marketId && (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Icon name="edit" size={20} color={Colors.pr} />
              </TouchableOpacity>
            }>
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigation.navigate(OffersRoutes.OfferForm, {
                  offer,
                });
              }}
              title={strings('common.btn.edit').toLowerCase()}
              icon={() => <Icon name="edit" size={20} color={Colors.pr} />}
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigation.navigate(OffersRoutes.OfferForm, {
                  offer,
                });
              }}
              title={strings('common.btn.delete').toLowerCase()}
              icon={() => <Icon name="trash" size={20} color={Colors.pr} />}
            />
          </Menu>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 4,

    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowColor: 'rgba(69, 16, 17, 0.15)',
    elevation: 2,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

export default OfferItem;
