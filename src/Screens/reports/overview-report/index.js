import React from 'react';
import {View} from 'react-native';
import {OverviewHeader} from './overview-header';
import {ReportChart} from './report-chart';

export const OverviewReports = () => {
  const [selectedReport, setSelectedReport] = React.useState('revenues');
  return (
    <View style={{flex: 1}}>
      <OverviewHeader onPress={setSelectedReport} />
      <ReportChart selectedReport={selectedReport} />
    </View>
  );
};
