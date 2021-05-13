import {Included} from '@pyt/icons';
import {Text} from '@pyt/micros';
import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import React, {ReactElement, ReactSVGElement} from 'react';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import getSymbolFromCurrency from 'currency-symbol-map';
import {getGlobalPriceWithoutSymbol} from '../../ExploreScreen/services/getPriceWithoutSymbol';
import {Dimensions} from 'react-native';
import {string} from 'prop-types';

// const width = Dimensions.get('window').width;

export const HotelCardWrapper = ({
  hotelData,
  onPress,
  displayCurrency,
  nightText,
  paxText,
  cardIndex,
  width,
  ...restProps
}) => {
  const {
    imageURL,
    otherImages = [],
    name,
    publishedCost,
    strikedCost,
    distanceFromCityCenter,
    stars,
    amenitiesList,
    breakFastAvailable,
    refundable,
    amenities,
  } = hotelData ?? {};
  const image = imageURL || otherImages?.[0];

  const cost = getGlobalPriceWithoutSymbol({
    amount: parseInt((publishedCost as unknown) as string, 10),
    currency: displayCurrency,
  });
  const costSymbol = getSymbolFromCurrency(displayCurrency);

  const dotSeparateList = [
    `${parseInt(distanceFromCityCenter || 0, 10)} km from city center`,
    `${Math.round(stars)} star hotel`,
  ].map((list, index) => (
    <Text
      fontFamily={CONSTANT_fontPrimaryRegular}
      fontSize={13}
      color={'#333333'}
      key={index}>
      {list}
    </Text>
  ));

  const availableAmenities = [
    {
      text: 'Free WiFi',
      available: amenitiesList?.includes('Free WiFi'),
    },
    {
      text: 'Breakfast included',
      available: breakFastAvailable,
    },
    {text: 'Free cancellation', available: refundable},
    {
      text: 'Air condition',
      available: amenities?.some(
        ({name: amenityName}: {name: string}) =>
          amenityName.toUpperCase() === 'AIR CONDITIONING',
      ),
    },
  ].reduce(
    (
      amenityDisplayList: {
        text: string;
        icon: ReactElement;
      }[],
      amenity: {
        text: string;
        available: boolean;
      },
    ) => {
      if (amenity.available) {
        amenityDisplayList.push({
          text: amenity.text,
          icon: <Included fill="#AAAAAA" />,
        });
      }
      return amenityDisplayList;
    },
    [],
  );
  return (
    <HotelCard
      key={`${name}-${cardIndex}`}
      marginTop={20}
      backgroundColor="#ffffff"
      borderWidth={0}
      fontFamily={CONSTANT_fontPrimarySemiBold}
      width={width}
      title={name}
      sliderProps={{
        images: image ? [image] : [],
        showArrow: true,
      }}
      dotSeparateList={dotSeparateList}
      amenitiesProps={{
        fontFamily: CONSTANT_fontPrimaryRegular,
        itemProp: {width: 'auto', marginEnd: 12},
      }}
      amenities={availableAmenities}
      strikedCost={strikedCost ? `${costSymbol}${strikedCost}` : ''}
      cost={`${costSymbol}${cost}`}
      costSubText={`${nightText} & ${paxText}`}
      costSubTextProps={{
        fontFamily: CONSTANT_fontPrimaryRegular,
      }}
      footerRightElement={<></>}
      footerContainerProps={{
        marginTop: availableAmenities.length ? 2 : 14,
      }}
      onPress={onPress}
      {...restProps}
    />
  );
};
