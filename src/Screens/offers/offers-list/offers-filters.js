import {FlatList, StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {Colors} from '@theme/colors';
import React from 'react';
import {SPACE} from '@theme/styles';

const filterData = [
  {
    name: 'My Offers',
    key: 'my',
  },
  {
    name: 'All Offers',
    key: 'all',
  },
];

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

export const OffersFilters = ({setFilter, filter}) => {
  return (
    <View style={{marginBottom: 20}}>
      <FlatList
        horizontal
        data={filterData}
        keyExtractor={(category, index) => index.toString()}
        renderItem={({item}) => (
          <Chip
            textStyle={{
              color: item.key === filter ? Colors.white : Colors.pr,
            }}
            mode="outlined"
            style={[item.key === filter ? styles.active : styles.default]}
            onPress={() => setFilter(item.key)}>
            {item.name}
          </Chip>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
