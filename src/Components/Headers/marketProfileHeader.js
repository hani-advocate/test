import React from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {statusBarHeight} from '@theme/theme';
import {useDispatch, useSelector} from 'react-redux';
import Cancel from '@svg/x.svg';
import BackArrow from '@svg/arrow-left.svg';
import HeartInactive from '@svg/heart-inactive.svg';
import HeartActive from '@svg/heart-active.svg';
import {toggleIsFavorite} from '@root/Actions/market.actions';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const MarketProfileHeader = ({navigation}) => {
  const {market} = useSelector((store) => store.Markets);
  const dispatch = useDispatch();
  return (
    <View style={{height: hp(25)}}>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: 'rgba(0,0,0,0.1)',
          zIndex: 1,
        }}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconStyle}>
          <BackArrow />
        </TouchableOpacity>
        {/*<TouchableOpacity*/}
        {/*  onPress={() => dispatch(toggleIsFavorite(market.id))}*/}
        {/*  style={styles.heartStyle}>*/}
        {/*  {market.isFavorite ? <HeartActive /> : <HeartInactive />}*/}
        {/*</TouchableOpacity>*/}
      </View>
      <ImageBackground
        source={{uri: market.coverImage}}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 2,
    top: Platform.select({
      ios: statusBarHeight,
      android: 12,
    }),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconStyle: {
    width: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heartStyle: {
    width: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export {MarketProfileHeader};
export default MarketProfileHeader;
