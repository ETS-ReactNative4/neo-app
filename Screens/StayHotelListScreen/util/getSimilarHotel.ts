import {HotelDataType} from '../../StayHotelDetailScreen/StayHotelDetailScreen';
interface SimilarHotelProp {
  newHotel: HotelDataType[];
  index: number;
}
export const getSimilarHotel = ({
  newHotel = [],
  index = 0,
}: SimilarHotelProp) => {
  let elementAfterIndex: HotelDataType[] = [];
  const elementCountBeforeIndx = newHotel.slice(0, index).length;

  if (!index) {
    elementAfterIndex = newHotel.slice(index + 1, 9);
  } else if (index !== newHotel.length) {
    const afterIndexRemainingElement = newHotel.slice(index + 1);
    if (afterIndexRemainingElement.length <= 4) {
      elementAfterIndex = afterIndexRemainingElement;
    } else {
      const remainingElement = (elementCountBeforeIndx - 4) * -1;
      if (remainingElement < 4) {
        elementAfterIndex = newHotel.slice(
          index + 1,
          index + 5 + remainingElement,
        );
      } else {
        elementAfterIndex = newHotel.slice(index + 1, index + 4);
      }
    }
  }

  let elementBeforeIndex: HotelDataType[] = [];
  if (elementCountBeforeIndx >= 4) {
    if (elementAfterIndex.length - 4 === 0) {
      elementBeforeIndex = newHotel.slice(index - 4, index);
    }
    const remainingElement = (elementAfterIndex.length - 4) * -1;

    if (elementCountBeforeIndx >= remainingElement + 4) {
      elementBeforeIndex = newHotel.slice(
        index - (remainingElement + 4),
        index,
      );
    }
  } else {
    elementBeforeIndex = newHotel.slice(index - elementCountBeforeIndx, index);
  }

  return [...elementBeforeIndex, ...elementAfterIndex];
};
