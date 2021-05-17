import {Box, Button, ButtonProps, Text} from '@pyt/micros';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';

export const StayHotelFooter = ({
  rightButtonAction = () => null,
  leftButtonAction = () => null,
  buttonText,
  leftButtonText,
  leftButtonSubText,
  buttonProps = {},
  cost,
  costText,
}: {
  rightButtonAction: () => unknown;
  leftButtonAction?: () => unknown;
  buttonText: string;
  leftButtonText?: string;
  leftButtonSubText?: string;
  buttonProps?: ButtonProps;
  cost?: string;
  costText?: string;
}) => {
  return (
    <Box
      height={72}
      paddingHorizontal={20}
      backgroundColor="#ffffff"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <TouchableOpacity
        onPress={leftButtonAction}
        style={styles.leftButtonText}>
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          fontSize={13}
          lineHeight={17}
          color="#555555"
          textDecorationLine="underline">
          {leftButtonText}
        </Text>
        {leftButtonSubText ? (
          <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            fontSize={13}
            lineHeight={17}
            color="#555555"
            textDecorationLine="underline"
            marginTop={4}>
            {leftButtonSubText}
          </Text>
        ) : null}
      </TouchableOpacity>
      <Box flexDirection="row">
        <Box marginEnd={12} justifyContent="center">
          {costText ? (
            <Text
              fontFamily={CONSTANT_fontPrimaryRegular}
              fontSize={15}
              lineHeight={19}
              color="#777777"
              letterSpacing={-0.02}>
              {costText}
            </Text>
          ) : null}
          {cost ? (
            <Text
              fontFamily={CONSTANT_fontPrimarySemiBold}
              fontSize={20}
              lineHeight={24}
              color="#000000"
              letterSpacing={-0.02}
              marginTop={4}>
              {cost}
            </Text>
          ) : null}
        </Box>
        <Button
          backgroundColor={'#00C684'}
          paddingHorizontal={0}
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
    </Box>
  );
};

const styles = StyleSheet.create({
  leftButtonText: {
    flex: 1,
    marginEnd: 12,
    justifyContent: 'center',
  },
});
