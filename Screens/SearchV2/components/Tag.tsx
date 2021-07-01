import React, {ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
} from '../../../constants/fonts';
import Icon from '../../../CommonComponents/Icon/Icon';

type TagPropsType = {
  text: string;
  icon?: string;
  containStyle?: object;
  textStyle?: object;
};

export const Tag = ({
  text,
  containStyle = {},
  textStyle = {},
}: TagPropsType) => {
  return (
    <View style={[styles.container, containStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 26,
    width: 100,
    paddingHorizontal: 8,
    borderRadius: 60,
    backgroundColor: '#FFF7E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12, 22),
    color: '#806519',
  },
});
