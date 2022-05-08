import {Text} from '../Text';
import {strings} from '@root/i18n';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import EmptyImage from '@svg/empty-image.svg';
import React from 'react';
import {SCREEN_WIDTH, SPACE} from '@theme/theme';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: SCREEN_WIDTH * 0.4,
    marginTop: 12,
    borderRadius: 6,
  },
});

export const ImagePicker = ({isRequired, pickImage, label, image}) => {
  return (
    <View>
      <Text className="caption textLeft">
        {strings(label)}
        {isRequired && <Text className={'red'}>{' *'}</Text>}
      </Text>
      <TouchableOpacity onPress={pickImage} style={{marginVertical: SPACE}}>
        {image ? (
          <Image
            source={{uri: image.path || image.uri || image}}
            style={{
              ...styles.image,
            }}
          />
        ) : (
          <EmptyImage width={'100%'} height={SCREEN_WIDTH * 0.4} />
        )}
      </TouchableOpacity>
    </View>
  );
};
