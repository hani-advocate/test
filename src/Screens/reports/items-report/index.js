import React, {useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet, ScrollView} from 'react-native';
import {DataTable, Divider} from 'react-native-paper';
import {CommonStyles, SPACE} from '@theme/styles';
import {Colors} from '@theme/colors';
import {InputIcon, PaperInput, Text} from '@root/Components';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Calender from '@svg/calendar.svg';
import DropDownPicker from 'react-native-dropdown-picker';
import {reportAPI} from '@api/reports.api';

export const ItemsReports = () => {
  const [dates, setDates] = React.useState({
    from: moment().add(-7, 'd'),
    to: moment(),
  });
  const [sortOptions] = React.useState([
    {
      label: 'Less',
      value: 'asc',
    },
    {
      label: 'Most',
      value: 'desc',
    },
  ]);
  const [activePicker, setActivePicker] = React.useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [sort, setSortValue] = React.useState('asc');

  useEffect(() => {
    reportAPI.itemsSales({...dates, sort}).then((result) => {
      setProducts(result);
    });
  }, [sort, dates]);

  const showDatePicker = (pickerName) => {
    setActivePicker(pickerName);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setActivePicker(null);
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (activePicker) {
      setDates({
        ...dates,
        [activePicker]: moment(date),
      });
    }
    hideDatePicker();
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.formContainer}>
        <View style={{marginBottom: 20}}>
          <Text className="textLeft black">
            {
              'You can find your most/less sold items during a specific period of time'
            }
          </Text>
        </View>
        <View>
          <PaperInput
            value={dates.from.format('ll')}
            label={'From'}
            onChangeText={() => {}}
            right={
              <InputIcon
                icon={() => (
                  <TouchableOpacity onPress={() => showDatePicker('from')}>
                    <Calender style={{marginRight: 4}} color={Colors.black} />
                  </TouchableOpacity>
                )}
              />
            }
          />
        </View>
        <View>
          <PaperInput
            value={dates.to.format('ll')}
            label={'To'}
            onChangeText={() => {}}
            right={
              <InputIcon
                icon={() => (
                  <TouchableOpacity onPress={() => showDatePicker('from')}>
                    <Calender style={{marginRight: 4}} color={Colors.black} />
                  </TouchableOpacity>
                )}
              />
            }
          />
        </View>
        <View>
          <DropDownPicker
            items={sortOptions}
            defaultValue={'asc'}
            containerStyle={styles.pickerContainerStyle}
            style={styles.pickerStyle}
            itemStyle={styles.pickerItem}
            activeLabelStyle={styles.pickerActiveLabelStyle}
            renderSeperator={() => <Divider />}
            arrowSize={25}
            dropDownStyle={styles.dropDownStyle}
            onChangeItem={({value}) => setSortValue(value)}
          />
        </View>
      </View>
      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{flex: 5}}>Product Name</DataTable.Title>
            <DataTable.Title numeric>Total</DataTable.Title>
          </DataTable.Header>
          {products.map((p) => (
            <DataTable.Row>
              <DataTable.Cell
                style={{
                  flex: 5,
                }}>{`${p.name} (${p.weight} ${p.unit})`}</DataTable.Cell>
              <DataTable.Cell numeric>{p.total}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: SPACE * 3,
  },
  formContainer: {
    paddingHorizontal: SPACE,
  },
  dropDownStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderRadius: 50,
    ...CommonStyles.shadow,
  },
  pickerActiveLabelStyle: {
    color: Colors.pr,
  },
  pickerItem: {
    justifyContent: 'flex-start',
    height: 50,
  },
  pickerStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.black,
  },
  pickerContainerStyle: {
    height: 55,
    marginBottom: 20,
  },
  tableContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: SPACE,
    marginBottom: SPACE * 5,
    borderRadius: SPACE,
    paddingHorizontal: SPACE,
    paddingVertical: SPACE,
    ...CommonStyles.shadow,
  },
});
