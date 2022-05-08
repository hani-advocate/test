import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@root/Components';
import ArrowRight from '@svg/arrow-right-red.svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ICONS} from '@theme/theme';

const styles = StyleSheet.create({
  container: {
    paddingRight: wp(8),
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    paddingTop: 9,
    backgroundColor: 'white',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
  },
  first: {
    paddingTop: 52,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  icon: {
    width: 54,
    marginTop: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export const DataRow = ({
  title,
  description,
  Icon,
  first,
  hideArrow,
  onPress,
  rightIcon,
}) => {
  let firstStyles = {};

  if (first) {
    firstStyles = styles.first;
  }

  return (
    <View style={{...styles.container, ...firstStyles, ...styles.container}}>
      <TouchableOpacity style={styles.row} onPress={onPress}>
        <View style={styles.icon}>{Icon && <Icon />}</View>
        <View style={{flex: 1}}>
          <Text style={{flex: 2}} className="bold black textLeft">
            {title}
          </Text>
          <Text style={{flex: 1}} className="smallSz textLeft">
            {description}
          </Text>
        </View>
      </TouchableOpacity>
      {hideArrow ? null : (
        <TouchableOpacity onPress={onPress}>
          {rightIcon ? rightIcon : ICONS.menuRedArrow()}
        </TouchableOpacity>
      )}
    </View>
  );
};
