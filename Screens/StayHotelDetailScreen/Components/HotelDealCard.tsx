import {Box, Pill, Text} from '@pyt/micros';
import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../../CommonComponents/Icon/Icon';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {
  CONSTANT_arrowRight,
  CONSTANT_dealsIcon,
} from '../../../constants/imageAssets';
import resolveLinks from '../../../Services/resolveLinks/resolveLinks';
import {OfferCard} from '@pyt/widgets/dist/esm/offer-card';

const cardColors = [
  {
    colors: ['#3B2390', '#684BD3'],
    iconColor: '#4D33AB',
    textColor: '#D3C7FF',
  },
  {
    colors: ['#EF435D', '#BF364A'],
    iconColor: '#D53C53',
    textColor: '#FDECEF',
  },
  {
    colors: ['#D39F0D', '#FFC933'],
    iconColor: '#ECB723',
    textColor: '#FFF7E0',
  },
  {
    colors: ['#00C684', '#009E6A'],
    iconColor: '#01B076',
    textColor: '#E5F9F3',
  },
];

export const HotelDelaCard = ({
  strikedCost,
  cost,
  link,
  nights,
  hotelPaxText,
  index,
}: {
  strikedCost: number;
  cost: number;
  link: string;
  nights: number;
  hotelPaxText: string;
  index: number;
}) => {
  const offerValue = strikedCost
    ? Math.round(((strikedCost - cost) / cost) * 100)
    : 0;
  const nightText = `${nights} ${nights > 1 ? 'nights' : 'night'}`;
  return (
    <OfferCard
      backgroundColor=""
      height={184}
      width={280}
      borderRadius={12}
      onPress={() => resolveLinks(link)}
      fontFamily={CONSTANT_fontPrimaryRegular}
      marginStart={index ? 20 : 16}
      contentElement={
        <LinearGradient
          start={{x: 0.55, y: 1.0}}
          end={{x: 0.0, y: 0.35}}
          colors={cardColors[index].colors}
          style={styles.gradient}>
          <Icon
            name={CONSTANT_dealsIcon}
            size={144}
            color={cardColors[index].iconColor}
            style={styles.icon}
          />
          <Box>
            {offerValue ? (
              <Text
                fontSize={24}
                fontFamily={CONSTANT_fontPrimarySemiBold}
                color="#FFFFFF">
                {offerValue}% off
              </Text>
            ) : null}
            <Box flexDirection="row" marginTop={20}>
              <Pill
                borderRadius={6}
                backgroundColor="rgba(255, 255, 255, 0.1)"
                text={nightText}
                textProps={{
                  color: cardColors[index]?.textColor,
                  fontFamily: CONSTANT_fontPrimarySemiBold,
                }}
                paddingHorizontal={12}
                marginEnd={8}
              />
              <Pill
                borderRadius={6}
                backgroundColor="rgba(255, 255, 255, 0.1)"
                text={hotelPaxText}
                textProps={{
                  color: cardColors[index]?.textColor,
                  fontFamily: CONSTANT_fontPrimarySemiBold,
                }}
                paddingHorizontal={12}
              />
            </Box>

            <Text
              fontSize={15}
              fontFamily={CONSTANT_fontPrimarySemiBold}
              color={cardColors[index]?.textColor}
              marginTop={28}>
              Grab the deal <Icon name={CONSTANT_arrowRight} />
            </Text>
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
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingVertical: 20,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: -6,
    opacity: 0.9,
  },
});
