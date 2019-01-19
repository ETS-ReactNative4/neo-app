import apiUrls from "./apiUrls";
import colorPallete from "./colorPallete";
import fonts from "./fonts";
import imageAssets from "./imageAssets";
import serverUrls from "./serverUrls";
import styles from "./styles";
import appEvents from "./appEvents";
import appText from "./appText";
import { logError } from "../Services/errorLogger/errorLogger";

if (__DEV__) {
  const keys = [
    Object.keys(apiUrls),
    Object.keys(colorPallete),
    Object.keys(fonts),
    Object.keys(imageAssets),
    Object.keys(serverUrls),
    Object.keys(styles),
    Object.keys(appText)
  ];

  const duplicate = keys.reduce((dup, item) => {
    dup[item] += dup[item] ? 1 : 0;
    return dup;
  }, {});

  for (let key in duplicate) {
    if (duplicate[key] > 1) {
      logError("Duplicate Constant Key defined: " + key);
      break;
    }
  }
}

const constants = {
  ...apiUrls,
  ...colorPallete,
  ...fonts,
  ...imageAssets,
  ...serverUrls,
  ...appEvents,
  ...styles,
  ...appText
};

export default constants;
