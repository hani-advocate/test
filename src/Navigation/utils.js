import {useEffect} from 'react';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
// import {unreadNotificationsCount} from '@actions/index';

export const useOnTabPress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // dispatch(unreadNotificationsCount());
      try {
        if (route?.state?.routes?.length > 1) {
          navigation.dispatch(StackActions.popToTop());
        }
      } catch (ex) {
        console.log(ex);
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigation, route]);
};
