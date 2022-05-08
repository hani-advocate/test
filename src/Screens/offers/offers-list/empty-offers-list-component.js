import React from 'react';
import {useDimensions} from '@react-native-community/hooks';
import {View} from 'react-native';
import Empty from '@svg/empty-offers.svg';
import {Spinner, Text} from '@root/Components';
import {strings} from '@root/i18n';
import {usePromiseTracker} from 'react-promise-tracker';

const EmptyOffersListComponent = () => {
  const {height, width} = useDimensions().window;
  const {promiseInProgress = true} = usePromiseTracker({area: 'offers-list'});
  return (
    <View
      style={{
        flex: 1,
        height: height / 1.5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {promiseInProgress ? (
        <Spinner />
      ) : (
        <>
          <Empty />
          <Text className="bold red" style={{width: width / 1.8}}>
            {strings('offers.emptyText')}
          </Text>
        </>
      )}
    </View>
  );
};

export default EmptyOffersListComponent;
