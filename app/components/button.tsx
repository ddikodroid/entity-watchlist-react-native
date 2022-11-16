import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS, SPACING} from '../styles';

interface IButton {
  label: string;
  onPress: () => void;
}

const Button = ({label, onPress}: IButton) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: SPACING.lg,
    borderColor: COLORS.blue,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.blue,
  },
});
