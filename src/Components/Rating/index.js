import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ActiveSmall from '@svg/star-active.svg';
import InActiveSmall from '@svg/star-inactive.svg';
import ActiveLarge from '@svg/star-active-large.svg';
import InActiveLarge from '@svg/star-inactive-large.svg';
import ActiveHuge from '@svg/star-active-huge.svg';
import InActiveHuge from '@svg/star-inactive-huge.svg';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    width: hp(4),
    marginHorizontal: 2,
    marginRight: wp(1),
  },
});

const _default = ({
  rate = 2,
  mode = 'small',
  active = false,
  style,
  onRate,
}) => {
  const [state, set] = useState(rate);

  const Active = ({}) => {
    switch (mode) {
      case 'small': {
        return <ActiveSmall style={styles.star} />;
      }
      case 'large': {
        return <ActiveLarge style={styles.star} />;
      }
      case 'huge': {
        return <ActiveHuge style={[styles.star, {marginHorizontal: 6}]} />;
      }
    }
  };

  const InActive = ({}) => {
    switch (mode) {
      case 'small': {
        return <InActiveSmall style={styles.star} />;
      }
      case 'large': {
        return <InActiveLarge style={styles.star} />;
      }
      case 'huge': {
        return <InActiveHuge style={[styles.star, {marginHorizontal: 6}]} />;
      }
    }
  };

  return (
    <View style={{...styles.container, ...style}}>
      {[1, 2, 3, 4, 5].map(r => (
        <TouchableOpacity
          onPress={() => {
            set(r);
            onRate(r);
          }}
          disabled={!active}
          key={`${r}_star`}>
          {r <= state ? <Active /> : <InActive />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export {_default as Rating};
export default _default;
