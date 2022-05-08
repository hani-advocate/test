import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import {CodeField, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {Colors} from '@theme/colors';
import {Text} from '@root/Components';
import {SPACE} from '@theme/styles';

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
});

const CELL_COUNT = 4;

export const ConfirmationField = ({error, onValueChange}) => {
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onChange = React.useCallback(
    val => {
      onValueChange(val);
      setValue(val);
    },
    [onValueChange],
  );

  const focusCellStyle = {
    borderColor: Colors.pr,
    borderBottomWidth: 2,
  };

  const cellStyle = {
    width: '20%',
    height: 64,
    borderBottomWidth: 2,
    borderColor: error ? Colors.orange : Colors.black,
    alignItems: 'center',
  };

  return (
    <View style={{marginBottom: SPACE * 2.4}}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={onChange}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            style={[cellStyle, isFocused && focusCellStyle]}
            onLayout={getCellOnLayoutHandler(index)}>
            <Text className="normal big normal dark">{symbol}</Text>
          </View>
        )}
      />
      <Text
        marginTop="lg"
        color="error"
        tx={error ? 'verification.wrong' : 'noop'}
      />
    </View>
  );
};
