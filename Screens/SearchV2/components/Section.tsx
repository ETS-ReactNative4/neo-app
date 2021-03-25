import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CONSTANT_white} from '../../../constants/colorPallete';
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
} from '../../../constants/fonts';

type SectionPropsType = {
  title?: string;
  children: ReactNode;
};
export const SearchSection = ({title, children}: SectionPropsType) => {
  return (
    <View style={[styles.container, !title ? {paddingTop: 0} : {}]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: CONSTANT_white,
  },
  title: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16, 20),
    color: '#333333',
    paddingBottom: 4,
  },
});
