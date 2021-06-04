import {Box, Text} from '@pyt/micros';
import React, {ReactElement} from 'react';
import {theme} from '../../../constants/colorPallete';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';

export const ListSection = ({
  title,
  list = [],
}: {
  title: string;
  list: (string | ReactElement)[];
}) => {
  return (
    <Box
      paddingVertical={24}
      paddingHorizontal={18}
      backgroundColor={theme.colors.neutral001}
      marginTop={8}>
      <Text
        fontFamily={CONSTANT_fontPrimarySemiBold}
        fontSize={17}
        color={theme.colors.neutral007}
        marginBottom={4}>
        {title}
      </Text>

      {list.map((text, index) => (
        <Box
          flexDirection="row"
          marginTop={12}
          alignItems="flex-start"
          key={`${title}-${index}`}>
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
