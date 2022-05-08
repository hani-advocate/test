import React from 'react';
import Spinner from 'react-native-spinkit';
import {StyleSheet, View} from 'react-native';
import {Colors} from '@theme/theme';

export default () => (
  <View style={styles.container}>
    <Spinner type={'Circle'} color={Colors.pr} isVisible={true} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
