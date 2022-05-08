import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import moment from 'moment';
import {Chip} from 'react-native-paper';
import {Colors} from '@theme/colors';
import {SPACE} from '@theme/styles';

const DATA = [
  {
    id: 'WEEK',
    label: '7 Days',
    from: moment().add(-7, 'd'),
    to: moment(),
  },
  {
    id: 'MONTH',
    label: 'Month',
    from: moment().add(-1, 'months'),
    to: moment(),
  },
  {
    id: '6_MONTH',
    label: '6 Months',
    from: moment().add(-6, 'months'),
    to: moment(),
  },
  {
    id: 'YEAR',
    label: 'Year',
    from: moment().add(-1, 'years'),
    to: moment(),
  },
];

export const ReportsFilters = ({onChange, filter}) => {
  function renderItem({item}) {
    return (
      <Chip
        textStyle={{
          color: filter.id === item.id ? Colors.white : Colors.pr,
        }}
        mode="outlined"
        style={[filter.id === item.id ? styles.active : styles.default]}
        onPress={() => onChange(item)}>
        {item.label}
      </Chip>
    );
  }

  return (
    <View style={{marginVertical: SPACE}}>
      <FlatList
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SPACE,
        }}
        data={DATA}
        renderItem={renderItem}
        extraData={(item, index) => `report_filter_${index}`}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: Colors.pr,
    color: Colors.white,
    borderColor: Colors.white,
    marginRight: SPACE,
  },
  default: {
    marginRight: SPACE,
    borderColor: Colors.pr,
    backgroundColor: Colors.white,
  },
});
