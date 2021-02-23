import {STAYCATION_VERSION} from '../../constants/stringConstants';
import {IItinerary} from '../../TypeInterfaces/IItinerary';

export const isStaycation = (selectedItinerary: IItinerary | {}) => {
  const {itinerary, version} = selectedItinerary || {};
  return itinerary?.regionCode === 'ind' && version === STAYCATION_VERSION;
};
