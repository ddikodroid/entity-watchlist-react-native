import React, {forwardRef} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {ICONS} from '../assets';
import {COLORS, SPACING} from '../styles';

interface ISearchBar extends TextInputProps {}

const SearchBar = forwardRef<TextInput, ISearchBar>((props, ref) => (
  <View style={styles.container}>
    <TextInput
      ref={ref}
      {...props}
      style={styles.textInput}
      placeholderTextColor={COLORS.gray}
    />
    <Image source={ICONS.search} style={styles.searchIcon} />
  </View>
));

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? SPACING.md : undefined,
    paddingHorizontal: SPACING.md,
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightGray,
    borderRadius: SPACING.md,
    marginVertical: SPACING.md,
    marginHorizontal: SPACING.lg,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginStart: SPACING.s,
    tintColor: COLORS.gray,
  },
});
