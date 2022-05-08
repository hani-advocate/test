import React, {useCallback, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text} from '@root/Components';
import SafeAreaView from 'react-native-safe-area-view';
import {CommonStyles, SPACE} from '@theme/styles';
import PersonIcon from '@svg/person.svg';
import DeleteICon from '@svg/delete_trash.svg';
import {Colors} from '@theme/colors';
import {deleteAssistant, getAssistants} from '@actions/index';
import {useFocusEffect} from '@react-navigation/native';

const RowItem = ({item: user, onRemove}) => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        paddingVertical: SPACE,
        paddingHorizontal: SPACE * 2,
        backgroundColor: Colors.white,
        marginBottom: SPACE * 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
      }}>
      <PersonIcon />
      <View style={{flexGrow: 4, paddingHorizontal: SPACE}}>
        <Text className="bold black textLeft">{user.name}</Text>
        <Text className="smallSz textLeft">{user.phoneNumber}</Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(user.id)}>
        <DeleteICon />
      </TouchableOpacity>
    </View>
  );
};

export const AdminsList = () => {
  const [assistants, setAssistants] = useState([]);
  const fetchAssistants = useCallback(() => {
    try {
      getAssistants().then((temp) => setAssistants(temp));
    } catch (e) {
      console.log(e);
    }
  }, []);

  useFocusEffect(fetchAssistants);

  const onRemove = useCallback(
    async (assistantId) => {
      try {
        await deleteAssistant(assistantId);
        await fetchAssistants();
      } catch (e) {
        console.log(e);
      }
    },
    [fetchAssistants],
  );

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={[CommonStyles.content, {marginTop: SPACE * 3}]}>
        <View style={{flex: 1}}>
          <Text className="textLeft ">
            {
              'Add your assistants to help you with your regular duties, they will be able to Add/Edit the market items menu Accept/Deliver orders'
            }
          </Text>
          <FlatList
            contentContainerStyle={{
              marginTop: SPACE * 2,
            }}
            data={assistants}
            keyExtractor={(item) => `assistant_${item.id}`}
            renderItem={({item}) => <RowItem item={item} onRemove={onRemove} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
