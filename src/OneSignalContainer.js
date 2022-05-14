import React, {Fragment} from 'react';
import OneSignal from 'react-native-onesignal';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initializeOneSignal = async store => {
  OneSignal.setRequiresUserPrivacyConsent(false);
  OneSignal.provideUserConsent(true);
  OneSignal.setAppId('cc6efd90-7e66-4b0d-b04a-12ecb1b639b3');
  OneSignal.setLogLevel(6, 0);
  const deviceState = await OneSignal.getDeviceState();
  await AsyncStorage.setItem('deviceToken', deviceState.userId);
  console.log({deviceState});
};

export class OneSignalContainer extends React.Component {
  async componentDidMount() {
    /* O N E S I G N A L   S E T U P */
    console.log('start initialize one-signal');
    // OneSignal.setRequiresUserPrivacyConsent(true);
    OneSignal.setAppId('cc6efd90-7e66-4b0d-b04a-12ecb1b639b3');
    OneSignal.setLogLevel(6, 6);
    OneSignal.setRequiresUserPrivacyConsent(true);
    // OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    //   console.log('Prompt response:', response);
    // });

    // OneSignal.

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notifReceivedEvent,
      );
      let notif = notifReceivedEvent.getNotification();

      const button1 = {
        text: 'Cancel',
        onPress: () => {
          notifReceivedEvent.complete();
        },
        style: 'cancel',
      };

      const button2 = {
        text: 'Complete',
        onPress: () => {
          notifReceivedEvent.complete(notif);
        },
      };

      Alert.alert('Complete notification?', 'Test', [button1, button2], {
        cancelable: true,
      });
    });
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
    OneSignal.setInAppMessageClickHandler(event => {
      console.log('OneSignal IAM clicked:', event);
    });
    OneSignal.addEmailSubscriptionObserver(event => {
      console.log('OneSignal: email subscription changed: ', event);
    });
    OneSignal.addSubscriptionObserver(event => {
      console.log('OneSignal: subscription changed:', event);
      this.setState({isSubscribed: event.to.isSubscribed});
    });
    OneSignal.addPermissionObserver(event => {
      console.log('OneSignal: permission changed:', event);
    });

    const deviceState = await OneSignal.getDeviceState();
    this.setState({
      isSubscribed: deviceState.isSubscribed,
    });
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
