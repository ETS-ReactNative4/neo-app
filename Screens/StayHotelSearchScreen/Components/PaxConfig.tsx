import {Box, Text} from '@pyt/micros';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../CommonComponents/Icon/Icon';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {
  CONSTANT_addIcon,
  CONSTANT_lineBreakIcon,
} from '../../../constants/imageAssets';

const CounterButton = ({
  onPress = () => null,
  iconName,
  disable = false,
}: {
  onPress: () => unknown;
  iconName?: string;
  disable?: boolean;
}) => (
  <TouchableOpacity
    onPress={disable ? () => null : onPress}
    activeOpacity={0.2}>
    <Box
      width={22}
      height={22}
      borderWidth={1.5}
      borderRadius={22}
      borderColor={'#000000'}
      justifyContent="center"
      alignItems="center"
      opacity={disable ? 0.2 : 1}>
      <Text>
        <Icon
          name={iconName || CONSTANT_lineBreakIcon}
          color={'#000000'}
          size={12}
        />
      </Text>
    </Box>
  </TouchableOpacity>
);

export const PaxConfig = ({
  label,
  subText,
  disable,
  addAction = () => null,
  subAction = () => null,
  count = 0,
  ...restProps
}: {
  label: string;
  subText?: string;
  disable?: boolean;
  count: number;
  addAction?: () => null;
  subAction?: () => null;
}) => {
  return (
    <Box
      marginVertical={26}
      flexDirection="row"
      justifyContent="space-between"
      {...restProps}>
      <Box flexDirection="row" alignItems="center">
        <Text
          fontFamily={CONSTANT_fontPrimaryRegular}
          color="#333333"
          fontSize={17}
          lineHeight={21}>
          {label}
        </Text>
        <Text
          fontFamily={CONSTANT_fontPrimaryRegular}
          color="#777777"
          fontSize={15}>
          {subText}
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="center">
        <CounterButton disable={disable} onPress={subAction} />
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          color="#333333"
          fontSize={17}
          lineHeight={21}
          paddingHorizontal={16}>
          {count}
        </Text>
        <CounterButton
          iconName={CONSTANT_addIcon}
          disable={disable}
          onPress={addAction}
        />
      </Box>
    </Box>
  );
};
