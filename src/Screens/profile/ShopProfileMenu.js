import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {ScrollView, View} from 'react-native';
import {Tag, Text} from '@root/Components';
import {DataRow, LangPicker, ReportsAccordion} from '@advanced/index';
import ShopIcon from '@svg/shop-profile.svg';
import Avatar from '@svg/profile-picture.svg';
import CreditCard from '@svg/credit-cart.svg';
import PersonIcon from '@svg/person.svg';
import {useDispatch, useSelector} from 'react-redux';
import {ProfileRoutes} from '@constants/Routes';
import moment from 'moment';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {strings} from '@root/i18n';
import AboutUsIcon from '@svg/info-grey.svg';
import {logOut} from '@actions/index';
import LogoutIcon from '@svg/x-gray.svg';
import {CommonStyles} from '@theme/styles';

const ShopProfileMenu = () => {
  const {me, subscription} = useSelector(store => store.User);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <View>
              <Text
                style={{textAlign: 'left', marginBottom: 8}}
                className="header red">
                {strings('profile.welcomeText')}
              </Text>
              <Text style={{textAlign: 'left'}} className="bold grey">
                {me.name}
              </Text>
            </View>
            <Avatar />
          </View>
          <DataRow
            onPress={() => navigation.navigate(ProfileRoutes.PersonalInfo)}
            title={strings('profile.menu.personalInfo')}
            description={strings('profile.menu.shopInfoSubtitle')}
            Icon={() => <ShopIcon />}
          />
          <DataRow
            onPress={() => navigation.navigate(ProfileRoutes.ShopInfo)}
            title={strings('profile.menu.shopInfo')}
            description={strings('profile.menu.shopInfoSubtitle')}
            Icon={() => <ShopIcon />}
          />
          <DataRow
            onPress={() => navigation.navigate(ProfileRoutes.Subscription)}
            title={strings('profile.menu.subscriptionInfo')}
            description={`${strings('profile.menu.subscriptionValid')} ${moment(
              subscription.expireAt,
            ).format('ll')}`}
            Icon={() => <CreditCard />}
            RightComponent={() => <Tag text={'Gold'} />}
          />
          <DataRow
            onPress={() => navigation.navigate(ProfileRoutes.AdminsList)}
            title={strings('profile.menu.adminsList')}
            description={strings('profile.menu.adminsListSubtitle')}
            Icon={() => <PersonIcon />}
          />
          <DataRow
            onPress={() => navigation.navigate(ProfileRoutes.WebView)}
            title={strings('profile.menu.about')}
            description={strings('profile.menu.aboutSubtitle')}
            Icon={() => <AboutUsIcon />}
          />
          <LangPicker />
          <ReportsAccordion />
          <DataRow
            onPress={async () => {
              await dispatch(logOut());
            }}
            title={strings('profile.menu.logout')}
            description={strings('profile.menu.logoutSubtitle')}
            Icon={() => <LogoutIcon />}
            hideArrow={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export {ShopProfileMenu};
export default ShopProfileMenu;
