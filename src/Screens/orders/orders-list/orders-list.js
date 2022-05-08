import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {OrderListItem, OrdersEmptyList} from '@advanced/Orders';
import {SPACE} from '@theme/styles';

export const OrdersList = ({orders}) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        ListHeaderComponentStyle={styles.header}
        ListEmptyComponent={() => <OrdersEmptyList />}
        contentContainerStyle={[{marginTop: SPACE}]}
        data={orders}
        renderItem={({item}) => <OrderListItem order={item} />}
        keyExtractor={(item, index) => `orders_list_${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
