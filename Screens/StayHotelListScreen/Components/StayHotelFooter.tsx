import {Box, Button, Text} from '@pyt/micros';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CONSTANT_fontPrimarySemiBold} from '../../../constants/fonts';

export const StayHotelFooter = ({
  rightButtonAction = () => null,
  leftButtonAction = () => null,
  buttonText,
  leftButtonText,
  buttonProps = {},
}) => {
  return (
    <Box
      height={72}
      paddingHorizontal={20}
      backgroundColor="#ffffff"
      flexDirection='row'
      justifyContent="space-between"
      alignItems='center'>
      <TouchableOpacity onPress={leftButtonAction}>
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          fontSize={13}
          lineHeight={17}
          color="#555555"
          textDecorationLine="underline">
          {leftButtonText}
        </Text>
      </TouchableOpacity>
      <Button
        backgroundColor={'#00C684'}
        paddingHorizontal={16}
        borderRadius={8}
        onPress={rightButtonAction}
        text={buttonText}
        textProps={{
          color: '#ffffff',
          fontFamily: CONSTANT_fontPrimarySemiBold,
        }}
        alignSelf="flex-end"
        {...buttonProps}
      />
    </Box>
  );
};
