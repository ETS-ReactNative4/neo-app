import constants from "../../constants/constants";
import getTransferImage from "./getTransferImage";
import storeService from "../storeService/storeService";

/**
 * TODO: Handle empty transferplaceholder images
 */
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
      } else {
        return {
          image: constants.transferPlaceHolder,
          icon: constants.aeroplaneIcon
        };
      }
      break;

    case "RENTALCAR":
      return {
        image: getTransferImage("CAR"),
        icon: constants.carIcon
      };

    case "CAR":
      return {
        image: getTransferImage("CAR"),
        icon: constants.carIcon
      };

    case "TRAIN":
      return { image: getTransferImage("TRAIN"), icon: constants.trainIcon };

    case "BUS":
      return { image: getTransferImage("BUS"), icon: constants.busIcon };

    case "FERRY":
      return { image: getTransferImage("FERRY"), icon: constants.ferryIcon };

    default:
      return {
        image: constants.transferPlaceHolder,
        icon: constants.transferIcon
      };
  }
};

export default getSlotImage;
