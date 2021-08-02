import React from 'react';
import {AmenitiesList, Box, Text} from '@pyt/micros';
import {ReadMoreCard} from '@pyt/widgets/dist/esm/read-more-card';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_primarySemiBold,
} from '../../../constants/fonts';
import {Included} from '@pyt/icons';
import {RoomDataType} from '../../StayHotelDetailScreen/StayHotelDetailScreen';

export const HotelRoomDetails = ({
  roomsInHotel = [],
}: {
  roomsInHotel: RoomDataType[];
}) => {
  return roomsInHotel?.map((room, index) => (
    <Box marginTop={8}>
      <Text fontFamily={CONSTANT_primarySemiBold} color="#333333" fontSize={14}>
        {roomsInHotel.length > 1 ? `Room ${index + 1} - ` : ''}
        {room.name}
      </Text>
      <ReadMoreCard
        data={[
          {
            text: 'Free WiFi',
            available: room.freeWireless,
          },
          {
            text: 'Breakfast included',
            available: room.freeBreakfast,
          },
          {
            text: 'Ac available',
            available: room.acAvailable,
          },
          {
            text: 'Free cancellation',
            available: room.refundable,
          },
        ].reduce((list, amenity) => {
          if (amenity.available) {
            list.push({
              icon: <Included fill={'#555555'} />,
              text: amenity.text,
            });
          }
          return list;
        }, [])}
        defaultVisibleItemCount={4}
        fontFamily={CONSTANT_fontPrimaryRegular}
        showViewLess={false}
        RenderItem={
          <AmenitiesList
            data={[]}
            fontFamily={CONSTANT_fontPrimaryRegular}
            itemProp={{
              width: 'auto',
              marginEnd: 16,
            }}
          />
        }
      />
    </Box>
  ));
};
