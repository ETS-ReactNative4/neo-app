import {Box, Pill, Text} from '@pyt/micros';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../../ExploreScreen/services/getPriceWithoutSymbol';
import getSymbolFromCurrency from 'currency-symbol-map';
import {StyleSheet} from 'react-native';
import {OfferCard} from '@pyt/widgets/dist/esm/offer-card';

export const TopHotelCard = ({
  title,
  cost,
  numberOfNights,
  displayCurrency,
  index,
  strikedCost,
  onPress,
  image,
}: {
  title: string;
  cost: number;
  numberOfNights: number;
  displayCurrency: string;
  index: number;
  strikedCost: number;
  onPress: () => unknown;
  image: string;
}) => {
  const amount = getGlobalPriceWithoutSymbol({
    amount: cost,
    currency: displayCurrency,
  });
  const costSymbol = getSymbolFromCurrency(displayCurrency);
  const offerValue = strikedCost
    ? Math.round(((strikedCost - cost) / cost) * 100)
    : 0;
  const costSubText = `${numberOfNights} ${
    numberOfNights > 1 ? 'nights' : 'night'
  }`;
  return (
    <OfferCard
      title="Get 27% off now"
      description="Best price in the market. Book now!"
      backgroundColor="#121D33"
      justifyContent="flex-end"
      width={252}
      height={320}
      marginEnd={20}
      marginStart={index ? 0 : 20}
      ribbonProps={{
        fontFamily: CONSTANT_fontPrimarySemiBold,
        text: 'PYT VERIFIED',
      }}
      onPress={onPress}
      fontFamily={CONSTANT_fontPrimaryRegular}
      src={image}
      contentElement={
        <LinearGradient
          locations={[0, 1.0]}
          colors={['rgba(18, 29, 51, 0)', '#121D33']}
          style={styles.gradient}>
          <Text
            fontFamily={CONSTANT_fontPrimarySemiBold}
            color="#FBFAF8"
            fontSize={17}
            lineHeight={24}>
            {title}
          </Text>
          <Box flexDirection="row" alignItems="flex-end">
            <Text
              fontSize={20}
              lineHeight={25}
              fontWeight={'600'}
              letterSpacing={-0.02}
              color="#FBFAF8">
              {costSymbol}
            </Text>
            <Text
              fontSize={20}
              lineHeight={25}
              fontWeight={'600'}
              letterSpacing={-0.02}
              color="#FBFAF8"
              fontFamily={CONSTANT_fontPrimarySemiBold}>
              {' '}
              {amount}
              {costSubText ? (
                <Text
                  fontSize={13}
                  letterSpacing={-0.02}
                  color="#FFFFFF"
                  opacity={0.7}
                  marginHorizontal={4}
                  fontFamily={CONSTANT_fontPrimaryRegular}>
                  {'  '}
                  {costSubText}
                </Text>
              ) : null}
            </Text>
            {offerValue ? (
              <Pill
                text={`${offerValue}% off`}
                paddingVertical={2}
                paddingHorizontal={4}
                backgroundColor="#EF435D"
                margin={0}
                alignSelf="center"
                marginStart={4}
                textProps={{
                  color: '#FFFFFF',
                  fontFamily: CONSTANT_fontPrimaryRegular,
                  fontSize: 12,
                }}
              />
            ) : null}
          </Box>
        </LinearGradient>
      }
    />
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    borderRadius: 0,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
});
