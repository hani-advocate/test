import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Rating, Text} from '@root/Components';
import styles from './styles';
import ArrowRight from '@svg/arrow-right.svg';
import {navigate} from '../../../NavigationService';
import {HomeRoutes} from '@constants/Routes';
import {strings} from '@root/i18n';
import {useDispatch} from 'react-redux';
import {navigateToMarket} from '@root/Actions/market.actions';
import {getDeliveryTime} from '@constants/Utils';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export const TimelineCard = ({market}) => {
  const dispatch = useDispatch();
  const onPress = async () => {
    await dispatch(navigateToMarket(market));
    navigate(HomeRoutes.Market);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{...styles.container, height: wp(35)}}
      onPress={onPress}>
      <Image
        source={{uri: market.logoImage}}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={{textAlign: 'left'}} className="bold black">
            {market.name}
          </Text>
          <Text style={{textAlign: 'left', lineHeight: 16}} className="smallSz">
            {market.address}
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.row}>
            <Text className="smallSz">{strings('markets.deliveryCost')}</Text>
            <Text className="red price">{`€ ${market.deliveryCost}`}</Text>
          </View>
          <View style={styles.row}>
            <Text className="smallSz">{strings('markets.deliveryTime')}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{getDeliveryTime(market.startDeliveryTime)}</Text>
              <ArrowRight />
              <Text>{getDeliveryTime(market.endDeliveryTime)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text className="smallSz">
              {market.totalRates}
              {` ${strings('markets.reviews')}`}
            </Text>
            <Rating rate={Math.round(market.rate)} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
