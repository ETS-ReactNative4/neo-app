import {ChevronRight} from '@pyt/icons';
import {Box, Button, Image, Pill, Text} from '@pyt/micros';
import React from 'react';
import {StyleSheet, Image as NativeImage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../../CommonComponents/Icon/Icon';
import SmartImageV2 from '../../../CommonComponents/SmartImage/SmartImageV2';
import {theme} from '../../../constants/colorPallete';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {
  CONSTANT_flagIcon,
  CONSTANT_FLAG_BG,
  CONSTANT_MENU_BANNER,
} from '../../../constants/imageAssets';

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    width: '100%',
    // flex: 1,
    borderRadius: 12,
    padding: 20,
    paddingTop: 28,
    // display: 'flex',
    // flexDirection: 'row'
    // justifyContent: 'center',
    // position: 'relative'
  },
  image: {
    position: 'absolute',
    left: '30%',
    right: -10,
    bottom: 0,
  },
});

export const MenuBanner = () => {
  return (
    <Box position="relative" width="100%" height={244}>
      <LinearGradient
        start={{x: 1.3, y: 1}}
        end={{x: 0, y: 0}}
        colors={['#3B2390', '#5739C6']}
        style={styles.gradient}>
        <SmartImageV2
          source={CONSTANT_MENU_BANNER()}
          height={100}
          width={100}
          style={styles.image}
        />
        <Box flexDirection="row" justifyContent="space-between">
          <Text
            fontFamily={CONSTANT_fontPrimaryRegular}
            fontWeight="700"
            color={theme.colors.accent002}
            fontSize={15}
            lineHeight={19}
            textTransform="uppercase"
            letterSpacing={0.5}>
            Sanjana Ramesh
          </Text>
          <Pill
            backgroundColor={theme.colors.accent002}
            paddingHorizontal={8}
            // paddingVertical={4}
            text="Silver member"
            textProps={{
              color: theme.colors.accent004,
              fontFamily: CONSTANT_fontPrimarySemiBold,
            }}
          />
        </Box>

        <Text
          fontFamily={CONSTANT_fontPrimaryRegular}
          fontWeight="700"
          color={theme.colors.neutral001}
          fontSize={32}
          lineHeight={40}
          marginTop={2}
          width={'80%'}>
          3,000
          <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            color={theme.colors.accent002}
            fontSize={14}>
            {' '}
            coins
          </Text>
        </Text>
        <Box marginTop={32} marginBottom={41} flexDirection="row">
          <Box
            width={20}
            height={20}
            borderWidth={3}
            borderRadius={20}
            marginRight={8}
            borderLeftColor={theme.colors.neutral001}
            borderBottomColor={theme.colors.accent004}
            borderTopColor={theme.colors.neutral001}
            borderRightColor={theme.colors.accent004}
            // opacity={0.1}
          />
          <Text
            fontFamily={CONSTANT_fontPrimaryRegular}
            color={theme.colors.accent001}
            fontSize={14}
            lineHeight={18}>
            Spend ₹2,00,000 to be a Gold member
          </Text>
        </Box>
        <Button width={168} paddingHorizontal={0} height={34} overflow="hidden">
          <Box
            position="absolute"
            width={'100%'}
            height={'100%'}
            top={0}
            backgroundColor={theme.colors.neutral001}
            zIndex={0}
            opacity={0.1}
            paddingHorizontal={12}
          />
          <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            color={theme.colors.accent001}
            fontSize={14}>
            How to use PYT coins <ChevronRight fill={theme.colors.accent001} />
          </Text>
        </Button>
      </LinearGradient>
    </Box>
  );
};
