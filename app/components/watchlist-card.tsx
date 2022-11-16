import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import dayjs from 'dayjs';
import {COLORS, SPACING} from '../styles';
import {ICONS} from '../assets';

interface IWatchlistCard {
  symbol: string;
  price: number;
  timestamp: any;
  onPress: () => void;
}

const WatchlistCard = ({symbol, price, timestamp, onPress}: IWatchlistCard) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={ICONS.data} style={styles.icon} />
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.entityContainer}>
          <Text style={styles.symbol}>{symbol}</Text>
          <Text style={styles.price}>{price ? `${price} USD` : 'N/A'}</Text>
        </View>
        <Text style={styles.timestamp}>
          {dayjs(timestamp * 1000).format('[Last updated:] HH:mm:ss')}
        </Text>
      </View>
    </Pressable>
  );
};

export default WatchlistCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: SPACING.xs,
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.lg,
    borderBottomColor: COLORS.lightGray,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLORS.blue,
  },
  iconContainer: {
    borderRadius: 30,
    padding: SPACING.s,
    marginEnd: SPACING.s,
    backgroundColor: COLORS.lightBlue,
  },
  dataContainer: {
    flex: 1,
  },
  entityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xxs,
    justifyContent: 'space-between',
  },
  symbol: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.darkGray,
  },
  price: {
    fontWeight: '700',
    color: COLORS.blue,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.gray,
  },
});
