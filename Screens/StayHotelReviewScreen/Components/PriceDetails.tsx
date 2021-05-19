import {Box, Text} from '@pyt/micros';
import React from 'react';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../../ExploreScreen/services/getPriceWithoutSymbol';
import StaySection from '../../StayHotelListScreen/Components/StaySection';
import getSymbolFromCurrency from 'currency-symbol-map';
import _capitalize from 'lodash/capitalize';
import {StayHotelRoomConfigurationType} from '../../StayHotelSearchScreen/StayHotelSearchScreen';
import {RoomDataType} from '../../StayHotelDetailScreen/StayHotelDetailScreen';
import {IItineraryDetails} from '../../../TypeInterfaces/IItineraryDetails';

export const PriceDetails = ({
  hotelGuestRoomConfiguration,
  nightText,
  displayCurrency,
  roomsInHotel,
  couponAmount,
  itinerary,
}: {
  hotelGuestRoomConfiguration: StayHotelRoomConfigurationType[];
  nightText: string;
  displayCurrency: string;
  roomsInHotel: RoomDataType[];
  couponAmount: number;
  itinerary: IItineraryDetails;
}) => {
  const costSymbol = getSymbolFromCurrency(displayCurrency);
  const roomCount = hotelGuestRoomConfiguration.length;
  const roomCost = roomsInHotel.reduce(
    (totalCost, room) => room.publishedCost + totalCost,
    0,
  );
  const {taxesAndFees, totalCost} = itinerary ?? {};

  const lineItem = (taxesAndFees?.costings || []).reduce(
    (itemList, costItem) => {
      if (costItem.cost) {
        itemList.push({
          label: _capitalize(costItem.pricing),
          price: costItem.cost,
        });
      }
      return itemList;
    },
    [],
  );
  const couponPriceLine = couponAmount
    ? [
        {
          label: 'Coupon',
          price: couponAmount,
          color: '#009E6A',
          fontFamily: CONSTANT_fontPrimarySemiBold,
          discount: true,
        },
      ]
    : [];
  const list = [
    {
      label: `${roomCount} ${roomCount > 1 ? 'rooms' : 'room'} - ${nightText}`,
      price: roomCost,
    },
    ...lineItem,
    ...couponPriceLine,
    {
      label: 'Total',
      price: totalCost,
      fontFamily: CONSTANT_fontPrimarySemiBold,
      color: '#333333',
    },
  ];
  return (
    <StaySection title="Price">
      {list.map((item, index) => {
        const cost = getGlobalPriceWithoutSymbol({
          amount: parseFloat(item.price as string),
          currency: displayCurrency,
        });

        return (
          <>
            <Box flexDirection="row" justifyContent="space-between">
              <Text
                fontSize={15}
                lineHeight={19}
                color={item.color || '#555555'}
                fontFamily={item.fontFamily || CONSTANT_fontPrimaryRegular}>
                {item.label}
              </Text>

              <Text
                fontFamily={item.fontFamily || CONSTANT_fontPrimaryRegular}
                fontSize={15}
                lineHeight={19}
                color={item.color || '#555555'}>
                {item.discount ? '-' : ''}
                {costSymbol}
                {cost}
              </Text>
            </Box>
            {index !== list.length - 1 ? (
              <Box height={1} backgroundColor="#F0F0F0" marginVertical={16} />
            ) : null}
          </>
        );
      })}
    </StaySection>
  );
};
