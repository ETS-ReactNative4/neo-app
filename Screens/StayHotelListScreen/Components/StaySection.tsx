import { Box, Text } from '@pyt/micros';
import React from 'react';
import { CONSTANT_fontPrimarySemiBold } from '../../../constants/fonts';

const StaySection = ({title, children}) => (
    <Box padding={20} backgroundColor="#ffffff" marginBottom={8}>
      <Text
        fontFamily={CONSTANT_fontPrimarySemiBold}
        fontSize={17}
        lineHeight={21}
        color={'#333333'}
        marginBottom={24}>
        {title}
      </Text>
      {children}
    </Box>
  );

export default StaySection