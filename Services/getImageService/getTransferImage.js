import _ from "lodash";
import constants from "../../constants/constants";

const getTransferImage = (vehicle, type = "SHARED") => {
  let upperCaseVehicle = _.toUpper(vehicle);
  switch (upperCaseVehicle) {
    case "BOAT":
      return `${constants.miscImageBaseUrl}venice_speed_boat.jpg`;
    case "FERRY":
      return `${constants.miscImageBaseUrl}ferry.jpg`;
    case "TRAIN":
      return `${constants.miscImageBaseUrl}transfers-train.jpg`;
    case "BUS":
      return `${constants.miscImageBaseUrl}transfers-bus.jpg`;
    case "SHUTTLE":
      return `${constants.miscImageBaseUrl}transfers-shuttle.jpg`;
    case "CAR":
      if (type === "PRIVATE") {
        return `${constants.miscImageBaseUrl}honda_accord.jpg`;
      } else {
        return `${constants.miscImageBaseUrl}transfers-shuttle.jpg`;
      }
    default:
      return `${constants.miscImageBaseUrl}honda_accord.jpg`;
  }
};

export default getTransferImage;
