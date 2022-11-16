import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ICONS} from '../assets';
import {COLORS, SPACING} from '../styles';
import IconButton from './icon-button';

interface IFilterCard {
  label: string;
  onAscending: () => void;
  onDescending: () => void;
}

const FilterCard = ({label, onAscending, onDescending}: IFilterCard) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttonContainer}>
        <IconButton
          source={ICONS.arrowUp}
          iconStyle={styles.icon}
          onPress={onAscending}
        />
        <IconButton
          source={ICONS.arrowDown}
          iconStyle={styles.icon}
          onPress={onDescending}
        />
      </View>
    </View>
  );
};

export default FilterCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  icon: {width: 32, height: 32},
  buttonContainer: {
    width: '27.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
