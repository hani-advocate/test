import * as React from 'react';
import {Divider, Menu, Text, TouchableRipple} from 'react-native-paper';
import {useDebouncedCallback} from 'use-debounce';
import {SCREEN_WIDTH} from '@theme/theme';

const ITEM_WIDTH = SCREEN_WIDTH - 16 * 2;

const MenuItems = ({items, onSelect, onClose}) => {
  return items.map((item, index) => {
    return (
      <React.Fragment key={index.toString()}>
        <TouchableRipple
          style={{paddingHorizontal: 12, paddingVertical: 16}}
          onPress={() => {
            onSelect(item);
            onClose();
          }}
          rippleColor="rgba(0, 0, 0, .18)">
          <Text style={{fontSize: 18}}>{item.name}</Text>
        </TouchableRipple>
        <Divider />
      </React.Fragment>
    );
  });
};

export const SearchableDropdown = ({
  onClose,
  visible,
  children,
  items,
  onSelect,
}) => {
  return (
    <Menu
      contentStyle={{
        marginTop: 52,
        alignItems: 'stretch',
        alignSelf: 'stretch',
        width: ITEM_WIDTH,
      }}
      style={{width: ITEM_WIDTH}}
      visible={items.length && visible}
      onDismiss={onClose}
      anchor={children}>
      <MenuItems items={items} onClose={onClose} onSelect={onSelect} />
    </Menu>
  );
};

export const useSearchableDropdown = ({action, leading}) => {
  const [visible, setVisible] = React.useState(true);
  const debounced = useDebouncedCallback(
    (value) => {
      action(value);
    },
    500,
    {leading: leading},
  );

  const onChangeText = (value) => {
    debounced.callback(value);
  };

  const onOpen = () => {
    if (visible) {
      return;
    }
    setVisible(true);
  };

  const onClose = React.useCallback(() => {
    setVisible(false);
  }, []);

  React.useEffect(() => {
    setVisible(true);
    return () => {
      setVisible(false);
      debounced.flush();
    };
  }, []);

  return {
    visible,
    onClose,
    onChangeText,
    onOpen,
  };
};
