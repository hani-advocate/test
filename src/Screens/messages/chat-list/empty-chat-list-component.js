import React from 'react';
import {StyleSheet, View} from 'react-native';
import Empty from '@svg/empty-messages.svg';
import {Text} from '@root/Components';
import {useDimensions} from '@react-native-community/hooks';
import {strings} from '@root/i18n';

const EmptyChatListComponent = () => {
  const {height, width} = useDimensions().window;
  return (
    <View
      style={{
        flex: 1,
        height: height / 2,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={styles.center}>
        <Empty />
        <Text className="bold red" style={{width: width / 1.8}}>
          {strings('chats.noMessage')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default EmptyChatListComponent;
