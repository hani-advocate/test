import React, {useEffect} from 'react';
import {View, ImageBackground, TouchableOpacity, FlatList} from 'react-native';
import {Colors, SCREEN_HEIGHT, SCREEN_WIDTH, SPACE} from '@theme/theme';

import BackArrow from '@svg/arrow-left.svg';
import {useNavigation} from '@react-navigation/native';
import {Text} from '@root/Components';
import OrdersIcon from '@svg/orders.svg';
import UsersIcon from '@svg/users.svg';
import DollarSignIcon from '@svg/dollar-sign.svg';
import {reportAPI} from '@api/reports.api';
import moment from 'moment';
const banner = require('@assets/banner.jpg');

const DATA = [
  {
    key: 'revenues',
    title: 'Revenues',
    icon: <DollarSignIcon color={Colors.dark} />,
  },
  {
    key: 'orders',
    title: 'Delivered Orders',
    icon: <OrdersIcon color={Colors.dark} />,
  },
  {
    key: 'customers',
    title: 'Customers',
    icon: <UsersIcon color={Colors.dark} />,
  },
];

export const OverviewHeader = ({onPress}) => {
  const navigation = useNavigation();
  const [overview, setOverview] = React.useState({});

  useEffect(() => {
    reportAPI.overview().then((result) => setOverview(result));
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress(item.key)}
        style={{
          width: SCREEN_WIDTH / 2.4,
          paddingVertical: SPACE * 2.4,
          paddingHorizontal: SPACE * 2.4,
          marginLeft: index === 0 ? SPACE * 2.4 : 0,
          marginRight: SPACE * 1.2,
          borderRadius: SPACE,
          backgroundColor: Colors.bg,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View>{item.icon}</View>
          <View>
            <Text
              className="price dark textLeft"
              style={{marginLeft: 10, marginBottom: 10}}>
              {item.title}
            </Text>
            <Text
              className="bigPrice green textLeft"
              style={{marginLeft: 10, color: Colors.green}}>
              {overview[item.key]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        height: SCREEN_HEIGHT / 4,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      }}>
      <ImageBackground
        source={banner}
        resizeMode="cover"
        style={{flex: 1, alignItems: 'center'}}>
        {/*back icon*/}
        <View
          style={{
            width: '100%',
            marginTop: SPACE * 4.8,
            alignItems: 'flex-start',
            paddingHorizontal: SPACE * 1.8,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <BackArrow />
          </TouchableOpacity>
        </View>
        {/*Balance*/}
        {/*<View style={{justifyContent: 'center', alignItems: 'center'}}>*/}
        {/*  <Text className="price normal white" style={{marginBottom: SPACE}}>*/}
        {/*    Today Revenues*/}
        {/*  </Text>*/}
        {/*  <Text className="bigPrice white" style={{fontSize: 30}}>*/}
        {/*    $1234*/}
        {/*  </Text>*/}
        {/*</View>*/}
        {/*Trending*/}
        <View
          style={{
            position: 'absolute',
            bottom: '-24%',
          }}>
          <Text
            className="caption bold textLeft white"
            style={{marginLeft: SPACE * 2.4, marginBottom: 10}}>
            {`Overview Today ${moment().format('ll')}`}
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
