import {StayHotelRoomConfigurationType} from '../StayHotelSearchScreen';

export const getPaxConfigText = (
  hotelGuestRoomConfiguration: StayHotelRoomConfigurationType[],
  roomText?: boolean,
) => {
  let adultCount = 0;
  let childCount = 0;

  (hotelGuestRoomConfiguration ?? []).forEach(
    (room: StayHotelRoomConfigurationType) => {
      adultCount = room.adultCount + adultCount;
      childCount = room.childAges?.length + childCount;
    },
  );
  const roomCount = (hotelGuestRoomConfiguration ?? []).length;
  return adultCount
    ? `${adultCount} ${adultCount > 1 ? 'Adults' : 'Adult'}${
        childCount ? ` - ${childCount} child` : ''
      }${roomText ? ` - ${roomCount} room` : ''} `
    : '';
};
