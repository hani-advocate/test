import React, {Fragment} from 'react';
import {Button, Text} from '@root/Components';
import isEmpty from 'lodash/isEmpty';

export default ({state, hide}) => {
  return (
    <Fragment>
      {!isEmpty(state.primary) && (
        <Button
          style={{marginTop: 48, marginBottom: 10}}
          onPress={() => {
            if (state.primary.action()) {
              state.primary.action();
            }
            hide();
          }}>
          <Text className="white bold">{state.primary.text}</Text>
        </Button>
      )}
      {!isEmpty(state.secondary) && (
        <Button
          style={{marginBottom: 10}}
          mode="outline"
          onPress={() => {
            if (state.secondary.action) {
              state.secondary.action();
            }
            hide();
          }}>
          <Text className="bold red">{state.secondary.text}</Text>
        </Button>
      )}
    </Fragment>
  );
};
