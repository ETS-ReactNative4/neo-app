import _ from "lodash";

const getTransferImage = (vehicle, type = "SHARED") => {
  let upperCaseVehicle = _.toUpper(vehicle);
  switch (upperCaseVehicle) {
    case "BOAT":
      return "http://d3lf10b5gahyby.cloudfront.net/misc/venice_speed_boat.jpg";
    case "FERRY":
      return "https://dig82prjykzgf.cloudfront.net/ferry.jpg";
    case "TRAIN":
      return "https://d3lf10b5gahyby.cloudfront.net/misc/transfers-train.jpg";
    case "BUS":
      return "https://d3lf10b5gahyby.cloudfront.net/misc/transfers-bus.jpg";
    case "SHUTTLE":
      return "https://d3lf10b5gahyby.cloudfront.net/misc/transfers-shuttle.jpg";
    case "CAR":
      if (type === "PRIVATE") {
        return "https://media.zigcdn.com/media/model/2016/Feb/honda_accord2016_600x300.jpg";
      } else {
        return "https://d3lf10b5gahyby.cloudfront.net/misc/transfers-shuttle.jpg";
      }
    default:
      return "https://media.zigcdn.com/media/model/2016/Feb/honda_accord2016_600x300.jpg";
  }
};

export default getTransferImage;
