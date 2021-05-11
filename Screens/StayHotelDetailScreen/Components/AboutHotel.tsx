import {Text} from '@pyt/micros';
import React from 'react';

export const AboutHotel = ({data = '', showViewMore}) => {
  return (
    <Text
      fontSize={14}
      lineHeight={18}
      color="#333333"
      marginTop={12}
      numberOfLines={showViewMore ? undefined : 4}>
      {data}
    </Text>
  );
};
