import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackHeaderProps} from '@react-navigation/stack';
import {
  CONSTANT_headerHeight,
  CONSTANT_xNotchHeight,
} from '../../constants/styles';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {CONSTANT_white} from '../../constants/colorPallete';
import ExploreHeader, {
  ExploreHeaderProps,
} from '../../Screens/ExploreScreen/Components/ExploreHeader';

export interface IPrimaryHeaderConfig extends ExploreHeaderProps {}

const PrimaryHeader = (
  headerProps: IPrimaryHeaderConfig,
  // the following variable will be used in the future
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: StackHeaderProps,
) => {
  const heightStyle = {
    height: CONSTANT_headerHeight + (isIphoneX() ? CONSTANT_xNotchHeight : 0),
  };
  return (
    <View style={[styles.headerWrapper, heightStyle]}>
      <ExploreHeader {...headerProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    justifyContent: 'flex-end',
    backgroundColor: '#2B2B3D',
  },
});

export default PrimaryHeader;
