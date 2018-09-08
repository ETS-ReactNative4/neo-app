import constants from "../../constants/constants";
import getTransferImage from "./getTransferImage";
import storeService from "../storeService/storeService";

const getSlotImage = (identifier, type) => {
  switch (type) {
    case "FLIGHT":
      const flight = storeService.itineraries.flights.find(
        flight => flight.key === identifier
      );
      return {
        image: constants.getAirlineIcon(flight.airlineCode),
        icon: constants.aeroplaneIcon
      };

    case "TRAIN":
      return { image: getTransferImage("TRAIN"), icon: constants.trainIcon };

    default:
      return "";
  }
};

export default getSlotImage;
