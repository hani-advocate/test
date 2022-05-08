import React from 'react';
import {Rating, Text} from '@root/Components';
import {View} from 'react-native';

const RateOrder = () => {
  // const [state] = useContext(ModalContext);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text className="bigPrice black" style={{marginBottom: 16}}>
        Rate this shope
      </Text>
      <Rating active={true} rate={2} mode="huge" onRate={null} />
    </View>
  );
};

export default RateOrder;
