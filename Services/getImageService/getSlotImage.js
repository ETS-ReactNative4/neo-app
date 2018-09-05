import store from "../../mobx/Store";
import constants from "../../constants/constants";
import getTransferImage from "./getTransferImage";

const getSlotImage = (identifier, type) => {
  switch (type) {
    case "FLIGHT":
      const flight = store.itineraries.flights.find(
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
