import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import {Text} from '@root/Components';
import {TouchableOpacity} from 'react-native';

export const SubscriptionPeriodCard = ({
  setActive,
  text,
  isActive,
  isRight,
  features = [],
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={setActive}
      style={{
        paddingVertical: wp(4),
        width: 100,
        backgroundColor: isActive ? Colors.pr : Colors.bg,
        borderTopLeftRadius: isRight ? 0 : 50,
        borderBottomLeftRadius: isRight ? 0 : 50,
        borderTopRightRadius: isRight ? 50 : 0,
        borderBottomRightRadius: isRight ? 50 : 0,
        borderColor: Colors.pr,
        borderWidth: 0.5,
      }}>
      <Text className={`bold ${isActive ? 'white' : 'black'}`}>{text}</Text>
    </TouchableOpacity>
  );
};
