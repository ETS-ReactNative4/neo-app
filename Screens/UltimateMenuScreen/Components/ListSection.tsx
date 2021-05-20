import {Box, Text} from '@pyt/micros';
import React from 'react';
import {theme} from '../../../constants/colorPallete';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';

export const ListSection = ({title}: {title: string}) => {
  return (
    <Box paddingVertical={24} paddingHorizontal={18}>
      <Text
        fontFamily={CONSTANT_fontPrimarySemiBold}
        fontSize={17}
        color={theme.colors.neutral007}
        marginBottom={4}>
        {title}
      </Text>

      {[
        'Credits cannot be encashed or transferred',
        'Credits can’t be applied along with any other promotional coupons.',
        'Credits can be applied only for online transactions not for booked transaction.',
        'International credits can be applied only on international vacations and domestic credits can be applied only on domestic vacations',
      ].map((text, index) => (
        <Box flexDirection="row" marginTop={12} alignItems="flex-start">
          <Box
            width={6}
            height={6}
            borderRadius={6}
            backgroundColor={theme.colors.neutral003}
            marginEnd={8}
            marginTop={6}
          />
          <Box flex={1}>
            <Text
              fontFamily={CONSTANT_fontPrimaryRegular}
              fontSize={14}
              lineHeight={20}
              color={theme.colors.neutral007}
              alignItems="flex-start">
              {text}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
