import React, {FC} from 'react';
import {Image, Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import {ICONS} from '../assets';
import {COLORS, SPACING} from '../styles';

interface IDummySearchBar extends PressableProps {}

const DummySearchBar: FC<IDummySearchBar> = ({onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.container, {opacity: pressed ? 0.6 : 1}]}>
      <Text style={styles.placeholder}>Search entity</Text>
      <Image source={ICONS.search} style={styles.searchIcon} />
    </Pressable>
  );
};

export default DummySearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightGray,
    borderRadius: SPACING.md,
  },
  placeholder: {
    color: COLORS.gray,
    fontSize: 16,
  },
  searchIcon: {
    tintColor: COLORS.gray,
  },
});
