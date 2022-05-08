import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from '@root/Components';
import {Colors} from '@theme/theme';
import Dash from 'react-native-dash';
import Arrow from '@svg/right-arrow-red.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {strings} from '@root/i18n';

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(2),
    borderRadius: 10,
    marginHorizontal: wp(4),
    shadowOpacity: 0.8,
    shadowRadius: 12,
    shadowOffset: {
      height: 8,
      width: 0,
    },
    shadowColor: 'rgba(240, 90, 92, 0.15)',
    elevation: 2,
  },
  header: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(4),
  },
  footer: {
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
  },
  leftBall: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 18,
    left: -18,
    top: -16,
    backgroundColor: Colors.bg,
  },
  rightBall: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 18,
    right: -18,
    top: -16,
    backgroundColor: Colors.bg,
  },
});

export const Receipt = ({
  dcost,
  tcost,
  subtotal,
  time,
  note,
  text,
  onPress,
  bg,
  mode,
  hideArrow,
  showDash = true,
  rated,
}) => {
  let rightText;
  switch (mode) {
    case 'cart': {
      rightText = 'bigPrice white';
      break;
    }
    case 'submit': {
      rightText = 'bold price white';
      break;
    }
    default:
      break;
  }

  return (
    <View style={{...styles.container, backgroundColor: bg}}>
      <View style={styles.header}>
        {subtotal && (
          <View style={styles.row}>
            <Text className="bold white">{strings('common.subtotal')}</Text>
            <Text className={rightText}>{subtotal}</Text>
          </View>
        )}
        {dcost && (
          <View style={styles.row}>
            <Text className="bold white">{strings('common.deliveryCost')}</Text>
            <Text className={rightText}>{dcost}</Text>
          </View>
        )}
        {tcost && (
          <View style={styles.row}>
            <Text className="bold white">{strings('common.totalCost')}</Text>
            <Text className={rightText}>{tcost}</Text>
          </View>
        )}
        {time && (
          <View style={styles.row}>
            <Text className="bold white">
              {strings('common.expectedDeliveryTime')}
            </Text>
            {time}
          </View>
        )}
      </View>
      {showDash && (
        <View>
          <View style={styles.leftBall} />
          <View style={styles.rightBall} />
          <Dash
            style={{width: '100%', height: 1}}
            dashLength={6}
            dashGap={6}
            dashThickness={2}
            dashColor={Colors.bg}
          />
        </View>
      )}
      <View style={styles.footer}>
        {note && (
          <Text
            className="yellow bold"
            style={{marginBottom: 12, marginTop: 0}}>
            {note}
          </Text>
        )}
        {text && (
          <Button
            onPress={onPress}
            className="white"
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text className="bold" style={{color: bg}}>
              {text}
            </Text>
            {!hideArrow && <Arrow style={{marginLeft: 14}} />}
          </Button>
        )}
      </View>
    </View>
  );
};
