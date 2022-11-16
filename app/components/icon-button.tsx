import React from 'react';
import {
  Image,
  ImageProps,
  ImageStyle,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../styles';

interface IIconButton
  extends Omit<ImageProps, 'style'>,
    Omit<PressableProps, 'style'> {
  iconStyle?: StyleProp<ImageStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
}

const IconButton = ({iconStyle, buttonStyle, ...props}: IIconButton) => {
  return (
    <Pressable
      {...props}
      style={({pressed}) => [buttonStyle, {opacity: pressed ? 0.6 : 1}]}>
      <Image {...props} style={[styles.icon, iconStyle]} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  icon: {
    tintColor: COLORS.gray,
  },
});
