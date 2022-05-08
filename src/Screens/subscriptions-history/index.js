import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, FlatList} from 'react-native';
import {Spinner, Text} from '@root/Components';
import {Tag} from '@advanced/index';
import moment from 'moment';
import {strings} from '@root/i18n';
import {CommonStyles} from '@theme/styles';
import {Divider} from 'react-native-paper';
import {getSubscriptionsHistory} from '@actions/index';
import isEmpty from 'lodash/isEmpty';
import reactotron from 'reactotron-react-native';

export const SubscriptionsHistory = ({}) => {
  const [historyList, setHistory] = React.useState([]);
  const [currentSubscription, setCurrentSubscription] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const getHistory = React.useCallback(async () => {
    const {current, history} = await getSubscriptionsHistory();
    await setHistory(history);
    if (!isEmpty(current)) {
      await setCurrentSubscription(current);
    }
    await setIsLoading(false);
  }, [setCurrentSubscription, setHistory, setIsLoading]);

  React.useEffect(() => {
    getHistory();
  }, [getHistory]);

  if (isLoading) {
    return <Spinner />;
  }

  reactotron.log({historyList, currentSubscription});

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={[CommonStyles.content, {marginTop: 20}]}>
        {!!currentSubscription && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              alignItems: 'flex-start',
              paddingVertical: 6,
            }}>
            <View style={{flex: 0.75}}>
              <Text
                className="textLeft bold bigPrice black "
                style={{marginBottom: 8}}>
                {strings('subscriptions.currentSubscription')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 20,
                }}>
                <Text className="bold black textLeft" style={{flex: 1}}>
                  {strings('subscriptions.subscriptionStart')}{' '}
                </Text>
                <Text className="normal textLeft" style={{flex: 1}}>
                  {moment(currentSubscription.subscribedAt).format('ll')}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 20,
                }}>
                <Text className="bold black textLeft" style={{flex: 1}}>
                  {strings('subscriptions.subscriptionEnd')}{' '}
                </Text>
                <Text className="normal textLeft" style={{flex: 1}}>
                  {moment(currentSubscription.expireAt).format('ll')}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 20,
                }}>
                <Text className="bold black textLeft" style={{flex: 1}}>
                  {strings('subscriptions.offersUsage')}{' '}
                </Text>
                <Text className="normal textLeft" style={{flex: 1}}>
                  {`${currentSubscription.currentOffers}/${currentSubscription.totalOffers}`}
                </Text>
              </View>
            </View>
            <View style={{flex: 0.25}}>
              <Tag
                type={currentSubscription.plan}
                text={currentSubscription.plan}
                classes={'bigPrice white'}
              />
            </View>
          </View>
        )}
        {historyList.length > 0 && (
          <View>
            <Divider style={{height: 1, marginBottom: 8}} />
            <View style={{marginTop: 20}}>
              <Text
                className="textLeft bold bigPrice black "
                style={{fontSize: 16}}>
                {strings('subscriptions.subscriptionHistory')}
              </Text>
            </View>
            <FlatList
              data={historyList || []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignSelf: 'stretch',
                      alignItems: 'center',
                      paddingVertical: 6,
                    }}>
                    <View style={{flex: 0.75}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingRight: 20,
                        }}>
                        <Text className="bold black textLeft" style={{flex: 1}}>
                          {strings('subscriptions.subscriptionStart')}{' '}
                        </Text>
                        <Text className="normal textLeft" style={{flex: 1}}>
                          {moment(item.subscribedAt).format('ll')}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingRight: 20,
                        }}>
                        <Text className="bold black textLeft" style={{flex: 1}}>
                          {strings('subscriptions.subscriptionEnd')}{' '}
                        </Text>
                        <Text className="normal textLeft" style={{flex: 1}}>
                          {moment(item.expireAt).format('ll')}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingRight: 20,
                        }}>
                        <Text className="bold black textLeft" style={{flex: 1}}>
                          {strings('subscriptions.offersUsage')}{' '}
                        </Text>
                        <Text className="normal textLeft" style={{flex: 1}}>
                          {`${item.currentOffers}/${item.totalOffers}`}
                        </Text>
                      </View>
                    </View>
                    <View style={{flex: 0.25}}>
                      <Tag
                        text={item.plan}
                        type={item.plan}
                        classes={'normal white'}
                      />
                    </View>
                  </View>
                  <Divider style={{height: 1, marginBottom: 8}} />
                </View>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
