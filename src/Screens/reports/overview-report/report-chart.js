import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
} from 'victory-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import VictoryCustomTheme from './victory-custom-theme';
import {Colors, SCREEN_HEIGHT, SPACE} from '@theme/theme';
import moment from 'moment';
import {ReportsFilters} from '@screens/reports/overview-report/reports-filters';
import {Text} from '@root/Components';
import {reportAPI} from '@api/reports.api';
import {strings} from '@root/i18n';

export const ReportChart = ({selectedReport}) => {
  const [filter, setFilter] = React.useState({
    id: 'WEEK',
    label: '7 Days',
    from: moment().add(-7, 'd'),
    to: moment(),
  });
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    const {from, to} = filter;
    reportAPI.details(selectedReport, {from, to}).then((result) => {
      setChartData(result);
    });
  }, [filter, selectedReport]);

  return (
    <View style={{marginTop: 80}}>
      <View style={{marginLeft: SPACE, marginBottom: SPACE}}>
        <Text className="bigPrice red textLeft">
          {strings(`reports.${selectedReport}`)}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.white,
          marginHorizontal: SPACE,
          borderRadius: SPACE,
          paddingHorizontal: SPACE,
          paddingVertical: SPACE,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        }}>
        <VictoryChart theme={VictoryCustomTheme} height={SCREEN_HEIGHT / 2.7}>
          <VictoryLine
            style={{
              data: {
                stroke: Colors.pr,
              },
              parent: {
                border: '1px solid #ccc',
              },
            }}
            data={chartData}
          />
          <VictoryScatter
            data={chartData}
            size={7}
            style={{
              data: {
                fill: Colors.pr,
              },
            }}
          />
          <VictoryAxis
            style={{
              grid: {
                stroke: 'transparent',
              },
            }}
            tickFormat={(t) =>
              moment(t).format(filter.id === 'WEEK' ? 'ddd' : 'M/D')
            }
          />
          <VictoryAxis
            dependentAxis={true}
            style={{
              axis: {
                stroke: 'transparent',
              },
              grid: {
                stroke: 'grey',
              },
            }}
            tickFormat={(t) => {
              return parseInt(t);
            }}
          />
        </VictoryChart>
        <ReportsFilters onChange={setFilter} filter={filter} />
      </View>
    </View>
  );
};
