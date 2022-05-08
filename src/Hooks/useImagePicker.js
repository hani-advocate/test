import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import reactotron from 'reactotron-react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export const PHOTO_LIBRARY_PERMISSION = async () =>
  request(PERMISSIONS.IOS.PHOTO_LIBRARY)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch((error) => {
      // …
    });

export const CAMERA_PERMISSION = async () =>
  request(PERMISSIONS.IOS.CAMERA)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch((error) => {
      // …
    });

const useImagePicker = () => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      CAMERA_PERMISSION();
      PHOTO_LIBRARY_PERMISSION();
    }
  }, []);

  // const pickImage = () => launchImageLibrary(options, (response) => {});

  const pickImage = () => {
    if (Platform.OS === 'android') {
      return launchImageLibrary(
        {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
          },
          mediaType: 'mixed',
        },
        (response) => {
          if (response.didCancel) {
          } else if (response.error) {
          } else {
            setImage(response.assets[0]);
          }
        },
      );
    } else {
      return ImagePicker.openPicker({
        cropping: true,
        width: 400,
        height: 400,
        freeStyleCropEnabled: true,
        compressImageQuality: 1,
        mediaType: 'photo',
      }).then((image) => {
        reactotron.log({image});
        setImage(image);
        return image;
      });
    }
  };

  return {
    pickImage,
    image,
    setImage,
  };
};

export {useImagePicker, useImagePicker as default};
