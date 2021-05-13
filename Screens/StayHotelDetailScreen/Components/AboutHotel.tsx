import {Text} from '@pyt/micros';
import React from 'react';
import {CONSTANT_fontPrimaryRegular} from '../../../constants/fonts';

export const AboutHotel = ({
  data = '',
  showViewMore,
  description,
}: {
  data?: string;
  showViewMore: boolean;
  description?: string;
}) => {
  return (
    <Text
      fontSize={14}
      lineHeight={20}
      color="#333333"
      fontFamily={CONSTANT_fontPrimaryRegular}
      numberOfLines={showViewMore ? 4 : undefined}>
      {description || data}
    </Text>
  );
};
