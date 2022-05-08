import React from 'react';
import {Platform, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Colors} from '@theme/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {List} from 'react-native-paper';
import {Text} from '@root/Components';
import {useNavigation} from '@react-navigation/native';
import {ProfileRoutes} from '@constants/Routes';
import ClipboardIcon from '@svg/clipboard.svg';
import DatabaseIcon from '@svg/database.svg';
import PieChartIcon from '@svg/pie-chart.svg';
import {strings} from '@root/i18n';

export const ReportsAccordion = () => {
  const navigation = useNavigation();
  return (
    <List.Accordion
      title={strings('profile.menu.reports')}
      titleStyle={styles.titleStyle}
      description={strings('profile.menu.reportsSubtitle')}
      descriptionStyle={styles.descriptionStyle}
      left={() => <PieChartIcon color={Colors.grey} />}
      style={styles.listStyle}>
      <View
        style={{paddingLeft: 24, backgroundColor: 'white', marginBottom: 8}}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ProfileRoutes.OverviewReports)}
          style={styles.itemContainer}>
          <ClipboardIcon color={Colors.pr} />
          <Text style={{marginLeft: 12}} className={'bold black textLeft '}>
            {'Overview Reports'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ProfileRoutes.ItemsReports)}
          style={styles.itemContainer}>
          <DatabaseIcon color={Colors.pr} />
          <Text style={{marginLeft: 12}} className={'bold black  textLeft'}>
            {'Items Reports'}
          </Text>
        </TouchableOpacity>
      </View>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Black'}),
    fontWeight: '900',
    color: Colors.black,
    fontSize: wp(3.5),
    lineHeight: hp(2.5),
    paddingLeft: 8,
  },
  descriptionStyle: {
    fontFamily: Platform.select({ios: 'Roboto', android: 'Roboto-Medium'}),
    color: Colors.grey,
    fontWeight: '500',
    fontSize: wp(3),
    textAlign: 'left',
    paddingLeft: 8,
  },
  listStyle: {
    paddingLeft: 18,
    paddingRight: 14,
    paddingBottom: 4,
    paddingTop: 4,
    backgroundColor: 'white',
    marginBottom: 6,
  },
  itemContainer: {
    marginVertical: 14,
    flexDirection: 'row',
  },
});
