import React, {useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {SPACE} from '@theme/styles';
import {Colors} from '@theme/colors';
import {useSelector} from 'react-redux';
import {useIsShop} from '@root/Utils';
import {useFocusEffect} from '@react-navigation/native';

export const CategoriesFilter = React.memo((props) => {
  const {categories, onPress, activeCategory} = props;
  const {hideCategoriesFilter} = useSelector((store) => store.Markets);
  const isShopOwner = useIsShop();
  const flatListRef = useRef();
  const getItemLayout = (data, index) => ({
    length: 10,
    offset: 100 * index,
    index,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (flatListRef && flatListRef.current) {
        const activeCategoryIndex = categories.findIndex(
          (x) => x.id === activeCategory,
        );
        if (activeCategoryIndex === -1) {
          return;
        }
        flatListRef.current.scrollToIndex({index: activeCategoryIndex});
      }
    }, [activeCategory, categories, flatListRef]),
  );

  return (
    <View style={{paddingTop: isShopOwner ? 0 : SPACE * 4}}>
      {hideCategoriesFilter ? null : (
        <FlatList
          ref={flatListRef}
          horizontal
          getItemLayout={getItemLayout}
          data={categories}
          keyExtractor={(category) => category.id.toString()}
          renderItem={({item: category}) => (
            <Chip
              textStyle={{
                color:
                  category.id === activeCategory ? Colors.white : Colors.pr,
              }}
              mode="outlined"
              style={[
                category.id === activeCategory ? styles.active : styles.default,
              ]}
              onPress={() => onPress(category.id)}>
              {category.name}
            </Chip>
          )}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  active: {
    backgroundColor: Colors.pr,
    color: Colors.white,
    borderColor: Colors.white,
    marginRight: SPACE,
  },
  default: {
    marginRight: SPACE,
    borderColor: Colors.pr,
    backgroundColor: Colors.white,
  },
});
