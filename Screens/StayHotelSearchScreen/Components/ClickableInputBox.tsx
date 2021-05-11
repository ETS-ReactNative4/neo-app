import React from 'react';

import {Box, Text} from '@pyt/micros';
import {TouchableOpacity} from 'react-native';

export const ClickableInputBox = ({
  fontFamily,
  label,
  value,
  onPress = () => null,
  containerProps = {},
  height,
}: {
  fontFamily: string;
  label: string;
  value: string;
  onPress?: () => unknown;
  containerProps?: {};
  height?: number;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={containerProps}>
      <Box
        height={height || 51}
        borderRadius={8}
        backgroundColor={'#EDEDED'}
        paddingHorizontal={16}
        paddingVertical={8}
        justifyContent="space-between">
        <Text
          fontSize={11}
          lineHeight={14}
          color={'#777777'}
          fontFamily={fontFamily}
          transform={[{translateY: value ? 0 : 8}]}>
          {label}
        </Text>
        <Text
          fontSize={15}
          lineHeight={19}
          color={'#333333'}
          fontFamily={fontFamily}>
          {value}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
