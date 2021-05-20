import React from 'react';
import {Box, Pill, Text} from '@pyt/micros';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {theme} from '../../../constants/colorPallete';

export const BannerLineItem = ({
  title,
  text,
  subText,
  pillText,
}: {
  title: string;
  text: string;
  subText?: string;
  pillText?: string;
}) => {
  return (
    <Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          color={theme.colors.accent002}
          fontSize={15}
          lineHeight={19}
          textTransform="uppercase"
          letterSpacing={0.5}>
          {title}
        </Text>
        {pillText ? (
          <Pill
            backgroundColor={theme.colors.accent002}
            paddingHorizontal={8}
            // paddingVertical={4}
            text={pillText}
            textProps={{
              color: theme.colors.accent004,
              fontFamily: CONSTANT_fontPrimarySemiBold,
            }}
          />
        ) : null}
      </Box>
      <Text
        fontFamily={CONSTANT_fontPrimaryRegular}
        fontWeight="700"
        color={theme.colors.neutral001}
        fontSize={32}
        lineHeight={40}
        // marginTop={2}
        width={'80%'}>
        {text}
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          color={theme.colors.accent002}
          fontSize={14}>
          {' '}
          {subText}
        </Text>
      </Text>
    </Box>
  );
};
