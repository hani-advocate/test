import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Menu, Searchbar, TouchableRipple} from 'react-native-paper';
import {Text} from '@root/Components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import Details from '@svg/details.svg';
import {useDebouncedCallback} from 'use-debounce';
import {SCREEN_WIDTH, SPACE} from '@theme/theme';

const ITEM_WIDTH = SCREEN_WIDTH - 16 * 2;

export const Autocomplete = React.forwardRef(
  (
    {
      items = [],
      leading = false,
      onSearch,
      onSelect,
      placeholder = 'Pick an item',
      initialValue = '',
    },
    ref,
  ) => {
    const [visible, setVisible] = React.useState(false);
    const [search, setSearch] = React.useState(initialValue);
    const debounced = useDebouncedCallback(
      (value) => {
        onSearch(value);
      },
      500,
      {leading: leading},
    );
    const openMenu = () => {
      setVisible(true);
    };
    const closeMenu = () => setVisible(false);

    React.useImperativeHandle(ref, () => ({
      reset() {
        closeMenu();
        setSearch('');
      },
    }));

    return (
      <Menu
        contentStyle={styles.menuContainer}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Searchbar
            inputStyle={styles.searchbarInput}
            style={styles.searchbar}
            placeholder={placeholder}
            icon={() => <Details />}
            value={search}
            onChangeText={(val) => {
              setSearch(val);
              debounced.callback(val);
            }}
            onFocus={() => openMenu()}
          />
        }>
        {items.map((item, index) => {
          return (
            <React.Fragment key={index.toString()}>
              <TouchableRipple
                style={{paddingHorizontal: SPACE, paddingVertical: SPACE * 0.5}}
                onPress={() => {
                  setSearch(`${item.name}, ${item.weight}-${item.unit}`);
                  onSelect(item);
                  closeMenu();
                }}
                rippleColor="rgba(0, 0, 0, .18)">
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text className="caption textLeft">{item.name}</Text>
                  {item.weight && item.unit && (
                    <Text className="caption textLeft">{`${item.weight}-${item.unit}`}</Text>
                  )}
                </View>
              </TouchableRipple>
              {index > items.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </Menu>
    );
  },
);

const styles = StyleSheet.create({
  searchbar: {
    fontSize: wp(3.5),
    borderColor: Colors.black,
    height: hp(6.2),
    borderWidth: 0.8,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  searchbarInput: {
    fontSize: wp(3.5),
    marginLeft: -14,
  },
  menuContainer: {
    marginTop: 52,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    width: ITEM_WIDTH,
  },
});
