import { isIphoneX } from "react-native-iphone-x-helper";
import { Platform } from "react-native";

const styles = {
  tabBarBottomHeight: isIphoneX() ? 86 : 56,
  headerHeight: Platform.OS === "ios" ? 44 : 56,
  xSensorAreaHeight: 30
};

export default styles;
