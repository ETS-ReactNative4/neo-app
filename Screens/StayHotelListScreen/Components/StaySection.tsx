import {Box, BoxProps, Text, TextProps} from '@pyt/micros';
import React, {ReactNode} from 'react';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';

interface StaySectiontype extends BoxProps {
  title?: string;
  subText?: string;
  children: ReactNode;
  textContainer?: TextProps;
  restProps?: BoxProps;
}
const StaySection = ({
  title,
  subText,
  children,
  textContainer = {},
  ...restProps
}: StaySectiontype) => (
  <Box padding={20} backgroundColor="#ffffff" marginBottom={8} {...restProps}>
    {title || subText ? (
      <Text
        marginBottom={24}
        numberOfLines={1}
        ellipsizeMode={'tail'}
        {...textContainer}>
        {title ? (
          <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            fontSize={17}
            lineHeight={21}
            color={'#333333'}>
            {title}
          </Text>
        ) : null}
        {subText ? (
          <Text
            fontSize={17}
            color="#777777"
            fontFamily={CONSTANT_fontPrimaryRegular}>
            {subText}
          </Text>
        ) : null}
      </Text>
    ) : null}
    {children}
  </Box>
);

export default StaySection;
