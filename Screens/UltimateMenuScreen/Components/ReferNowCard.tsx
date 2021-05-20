import {ChevronRight} from '@pyt/icons';
import {Box, Button, Image, Text} from '@pyt/micros';
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
} from '../../../constants/imageAssets';

const styles = StyleSheet.create({
  gradient: {
    height: 182,
    width: '100%',
    borderRadius: 12,
    padding: 20,
    paddingTop: 28,
  },
  image: {
    position: 'absolute',
    right: 0,
  },
});

export const ReferNowCard = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[theme.colors.primary002, theme.colors.primary003]}
      style={styles.gradient}>
      <SmartImageV2
        source={CONSTANT_FLAG_BG()}
        height={100}
        width={100}
        style={styles.image}
      />
      <Text
        fontFamily={CONSTANT_fontPrimarySemiBold}
        fontWeight="700"
        color={theme.colors.neutral001}
        fontSize={20}
        lineHeight={24}>
        Refer & earn 500 coins
      </Text>
      <Text
        fontFamily={CONSTANT_fontPrimaryRegular}
        color={theme.colors.primary001}
        fontSize={14}
        lineHeight={18}
        marginTop={12}
        marginBottom={20}
        width={'80%'}>
        Get coins when your friends download the app with your referral
      </Text>
      <Button
        width={113}
        height={36}
        backgroundColor={theme.colors.neutral001}
        opacity={0.8}>
        <Text
          fontFamily={CONSTANT_fontPrimarySemiBold}
          color={theme.colors.primary003}>
          Refer Now <ChevronRight fill={theme.colors.primary003} />
        </Text>
      </Button>
    </LinearGradient>
  );
};
