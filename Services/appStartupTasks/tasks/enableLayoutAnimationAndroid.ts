import { Platform, UIManager } from "react-native";
import { CONSTANT_platformAndroid } from "../../../constants/stringConstants";

/**
 * Enables layout animation on Android - not needed for iOS
 */
const enableLayoutAnimationAndroid = () => {
  if (Platform.OS === CONSTANT_platformAndroid) {
    UIManager?.setLayoutAnimationEnabledExperimental(true);
  }
};

export default enableLayoutAnimationAndroid;
