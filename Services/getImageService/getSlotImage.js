import constants from "../../constants/constants";
import getTransferImage from "./getTransferImage";
import storeService from "../storeService/storeService";

const getSlotImage = (identifier, type) => {
  switch (type) {
    case "FLIGHT":
      if (!identifier) {
        return {
          image: constants.transferPlaceHolder,
          icon: constants.aeroplaneIcon
        };
      }
      const flight = storeService.itineraries.flights.find(
        flight => flight.key === identifier
      );
      if (flight) {
        return {
          image: constants.getAirlineIcon(flight.airlineCode),
          icon: constants.aeroplaneIcon
        };
      }

    case "TRAIN":
      if (!identifier) {
        return {
          image: constants.transferPlaceHolder,
          icon: constants.trainIcon
        };
      }
      return { image: getTransferImage("TRAIN"), icon: constants.trainIcon };

    default:
      return {
        image: constants.transferPlaceHolder,
        icon: constants.activityIcon
      };
  }
};

export default getSlotImage;
