import React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ICONS} from '../assets';
import {COLORS, SPACING} from '../styles';

interface ISearchEntityCard {
  name: string;
  symbol: string;
  exchange: string;
  selected: boolean;
  onPress: () => void;
}

const SearchEntityCard = ({
  name,
  symbol,
  exchange,
  selected = false,
  onPress,
}: ISearchEntityCard) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.row,
        styles.container,
        {opacity: pressed ? 0.6 : 1},
      ]}
      onPress={() => {
        selected
          ? Alert.alert(
              'Duplicate entity',
              'This entity is already on watchlist.',
            )
          : onPress();
      }}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Image source={ICONS.data} style={styles.icon} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.info}>
            {symbol} - {exchange}
          </Text>
        </View>
      </View>
      <Image
        source={ICONS.check}
        style={selected ? styles.checkSelected : styles.check}
      />
    </Pressable>
  );
};

export default SearchEntityCard;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    marginBottom: SPACING.xs,
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.lg,
    justifyContent: 'space-between',
    borderBottomColor: COLORS.lightGray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 30,
    padding: SPACING.s,
    marginEnd: SPACING.s,
    backgroundColor: COLORS.lightBlue,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.blue,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: SPACING.xxs,
  },
  infoContainer: {width: '80%'},
  info: {
    color: COLORS.gray,
  },
  checkSelected: {
    width: 20,
    height: 20,
    tintColor: COLORS.blue,
  },
  check: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
  },
});
