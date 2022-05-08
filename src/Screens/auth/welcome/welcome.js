import {Button, Text} from '@root/Components';
import {StyleSheet, View} from 'react-native';
import {AuthRoutes} from '@constants/Routes';
import Illustration from '@svg/welcome-illustration.svg';
import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {strings} from '@root/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 28,
    paddingLeft: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginBottom: 10,
    fontSize: 32,
  },
  textContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  welcomeText: {
    fontWeight: '500',
  },
  skipText: {
    fontSize: 16,
  },
});

export default ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Illustration />
        <View style={styles.textContainer}>
          <Text className="header red" style={styles.headerText}>
            {strings('welcome.title')}
          </Text>
          <Text>{strings('welcome.body')}</Text>
        </View>
        <Button onPress={() => navigation.push(AuthRoutes.Login)}>
          <Text className="white bold">{strings('common.btn.login')}</Text>
        </Button>
        <Button onPress={() => navigation.push(AuthRoutes.Signup, {})}>
          <Text className="white bold">{strings('common.btn.signup')}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};
