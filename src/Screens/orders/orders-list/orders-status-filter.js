import React from 'react';
import {SPACE} from '@theme/styles';
import {FlatList, StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {Colors} from '@theme/colors';
import {strings} from '@root/i18n';

export const OrderStatusFilter = ({statuses, activeStatus, onPress}) => {
  return (
    <View style={{marginTop: SPACE}}>
      <FlatList
        horizontal
        style={{}}
        data={statuses}
        keyExtractor={(status) => status}
        renderItem={({item: status}) => (
          <Chip
            textStyle={{
              color: status === activeStatus ? Colors.white : Colors.pr,
            }}
            mode="outlined"
            style={[status === activeStatus ? styles.active : styles.default]}
            onPress={() => onPress(status)}>
            {strings(`orders.status.${status}`)}
          </Chip>
        )}
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
