import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ICONS} from '../assets';
import {COLORS, SPACING} from '../styles';

interface IEmptyPlaceholder {
  title: string;
  text: string;
}

const EmptyPlaceholder = ({title, text}: IEmptyPlaceholder) => {
  return (
    <View style={styles.container}>
      <Image source={ICONS.notFound} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}> {text}</Text>
    </View>
  );
};

export default EmptyPlaceholder;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    tintColor: COLORS.blue,
    marginBottom: SPACING.s,
    backgroundColor: COLORS.lightBlue,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.blue,
    marginBottom: SPACING.xs,
  },
  text: {
    width: '50%',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: COLORS.gray,
  },
});
