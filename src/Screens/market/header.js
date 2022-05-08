import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@root/Components';
import {strings} from '@root/i18n';
import {SPACE} from '@theme/styles';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACE,
    marginBottom: 0,
  },
  header: {
    // marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'left',
  },
});

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text className="big red" style={styles.headerText}>
          {`${strings('markets.headerHello')} `}
        </Text>
        <Text className="caption">{strings('markets.checkMenu')}</Text>
      </View>
    </View>
  );
};
