import React, {useContext, useState} from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeft from '@svg/arrow-left.svg';
import {SearchBar, Text} from '@root/Components';
import {navigate} from '../../../NavigationService';
import {HomeRoutes} from '@constants/Routes';
import CartActive from '@svg/cart-active.svg';
import CartEmpty from '@svg/cart-empty.svg';
import {strings} from '@root/i18n';
import HeartActive from '@svg/heart-active.svg';
import HeartInactive from '@svg/heart-inactive.svg';
import Info from '@svg/info.svg';
import {Colors, ICONS, SCREEN_HEIGHT, SPACE} from '@theme/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ModalContext} from '@advanced/index';
import {modalActionTypes, modalModes} from '@constants/Utils';
import {emptyCart, getMarketItems, toggleIsFavorite} from '@actions/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {debounce} from 'throttle-debounce';
import {HIDE_SNACKBAR, SHOW_SNACKBAR} from '@types/index';
import IconBadge from 'react-native-icon-badge';

const SharedFloatingHeader = ({hideSearch}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [, setModal] = useContext(ModalContext);
  const [query, setQuery] = useState('');
  const {
    Orders: {cart},
    Markets: {market, currentCategoryTab},
  } = useSelector((store) => store);

  const onChange = debounce(300, (text) => {
    const isCancelSearch = text === '' && query !== '';
    dispatch(
      getMarketItems(market.id, {
        category: isCancelSearch ? currentCategoryTab : undefined,
        search: isCancelSearch ? undefined : text,
      }),
    );
    setQuery(text);
  });

  const goBack = () => {
    if (cart.length) {
      if (
        route.name === HomeRoutes.Cart ||
        route.name === HomeRoutes.Checkout
      ) {
        navigation.goBack();
        return;
      }
      setModal({
        type: modalActionTypes.SET,
        payload: {
          mode: modalModes.FAILED,
          primary: {
            text: strings('common.btn.emptyCart'),
            action: async () => {
              await dispatch(emptyCart());
              navigation.navigate(HomeRoutes.Timeline);
            },
          },
          secondary: {
            text: strings('common.btn.continueShopping'),
            action: () => '',
          },
        },
      });
    } else {
      navigation.navigate(HomeRoutes.Timeline);
    }
  };

  const onGoToCart = () => {
    if (!cart.length) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          message: strings('orders.emptyCartWarning'),
          action: {
            label: strings('common.btn.ok'),
            onPress: () => dispatch({type: HIDE_SNACKBAR}),
          },
        },
      });
      return;
    }
    navigate(HomeRoutes.Cart);
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconStyle}
          hitSlop={{left: 12, top: 12, right: 12, bottom: 12}}
          onPress={goBack}>
          {ICONS.redBackArrow()}
        </TouchableOpacity>
        <View style={styles.searchInputContainer}>
          {hideSearch ? null : (
            <SearchBar mode="market" onTextChange={onChange} />
          )}
        </View>
        <TouchableOpacity style={styles.iconStyle} onPress={onGoToCart}>
          {cart.length ? (
            <IconBadge
              MainElement={<CartActive />}
              BadgeElement={
                <Text style={{color: '#FFF', fontSize: 10}}>{cart.length}</Text>
              }
              IconBadgeStyle={{
                width: 20,
                height: 20,
                top: -10,
                right: -10,
                backgroundColor: Colors.pr,
              }}
              Hidden={false}
            />
          ) : (
            <CartEmpty />
          )}
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={{uri: market.coverImage}}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={{
          ...styles.floatingFooter,
          bottom: -hp(4),
          paddingVertical: 20,
          width: wp(90),
        }}>
        <View style={{flexGrow: 1}}>
          <Text
            className="bold black"
            style={{
              textAlign: 'left',
              marginBottom: 4,
              fontSize: wp(3.8),
            }}>
            {market.name}
          </Text>
          {/*<View style={styles.ratesContainer}>*/}
          {/*  <Rating rate={market.rate} />*/}
          {/*  <Text className="smallSz red" style={{marginLeft: 16}}>*/}
          {/*    {`(${market.rate})`}*/}
          {/*  </Text>*/}
          {/*  <Text className="smallSz" style={{marginLeft: 16}}>*/}
          {/*    {`${market.totalRates} ${strings('markets.reviews')}`}*/}
          {/*  </Text>*/}
          {/*</View>*/}
        </View>
        <View style={styles.isFavContainer}>
          <TouchableOpacity
            onPress={() => dispatch(toggleIsFavorite(market.id))}>
            {market.isFavorite ? (
              <HeartActive width={25} height={25} />
            ) : (
              <HeartInactive width={25} height={25} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate(HomeRoutes.MarketProfile)}
            style={{marginLeft: 12}}>
            <Info width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 2,
    marginTop: Platform.select({
      android: SPACE * 2,
      ios: SCREEN_HEIGHT / 25,
    }),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACE,
  },
  floatingFooter2: {
    paddingHorizontal: wp(10),
    paddingVertical: wp(4.1),
    alignSelf: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(10),
    position: 'absolute',
    zIndex: 3,
    width: wp(80),
    borderRadius: 4,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowColor: 'rgba(69, 16, 17, 0.15)',
    elevation: 2,
  },
  floatingFooter: {
    alignSelf: 'center',
    paddingHorizontal: SPACE * 2,
    paddingVertical: wp(2.1),
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: wp(10),
    position: 'absolute',
    zIndex: 3,
    borderRadius: 4,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowColor: 'rgba(88, 88, 183, 0.1)',
    elevation: 2,
  },
  searchInputContainer: {
    flex: 1,
    flexGrow: 1,
  },
  ratesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  isFavContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SharedFloatingHeader;
