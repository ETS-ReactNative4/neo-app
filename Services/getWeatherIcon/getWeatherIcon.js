import { logError } from "../errorLogger/errorLogger";

const getWeatherIcon = icon => {
  const knownIcons = [
    "sleet",
    "wind",
    "cloudy",
    "partly-cloudy-day",
    "fog",
    "hail",
    "partly-cloudy-night",
    "snow",
    "thunderstorm",
    "rain",
    "clear-night",
    "clear-day"
  ];
  if (knownIcons.indexOf(icon) > -1) {
    return icon;
  } else {
    logError(`Missing weather icon - ${icon}`);
    return "cloudy";
  }
};

export default getWeatherIcon;
