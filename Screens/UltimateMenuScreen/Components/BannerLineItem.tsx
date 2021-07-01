import React from 'react';
import {Box, Pill, Text} from '@pyt/micros';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {theme} from '../../../constants/colorPallete';
import {getGlobalPriceWithoutSymbol} from '../../ExploreScreen/services/getPriceWithoutSymbol';
import {CardColorsType} from './MenuBanner';

export const BannerLineItem = ({
  title,
  amount,
  subText,
  pillText,
  cardColors,
}: {
  title: string;
  amount: number;
  subText?: string;
  pillText?: string;
  cardColors: CardColorsType;
}) => {
  const displayAmount = getGlobalPriceWithoutSymbol({
    amount: amount,
  }).trim();

  return (
    <Box>
      <Box flexDirection="row" justifyContent="space-between">
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          color={cardColors.textColor}
          fontSize={15}
          lineHeight={19}
          letterSpacing={0.5}>
          {title}
        </Text>
        {pillText ? (
          <Pill
            backgroundColor={cardColors.textColor}
            paddingHorizontal={8}
            // paddingVertical={4}
            text={pillText}
            textProps={{
              color: cardColors.pillTextColor,
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
        lineHeight={38}
        // marginTop={2}
        width={'80%'}>
        {displayAmount}
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          color={cardColors.textColor}
          fontSize={14}>
          {' '}
          {subText}
        </Text>
      </Text>
    </Box>
  );
};
