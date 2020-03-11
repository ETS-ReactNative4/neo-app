import React from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import {
  CONSTANT_black2,
  CONSTANT_white,
  CONSTANT_shade5
} from "../../../constants/colorPallete";
import Icon from "../../../CommonComponents/Icon/Icon";
import { CONSTANT_arrowRight } from "../../../constants/imageAssets";
import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";

interface ExploreHeaderProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const HEADER_LOGO_IMAGE_WIDTH = 112;
const HEADER_LOGO_IMAGE_HEIGHT = ratioCalculator(
  28,
  5,
  HEADER_LOGO_IMAGE_WIDTH
);

const ExploreHeader = ({ containerStyle }: ExploreHeaderProps) => {
  return (
    <View style={[styles.headerContainerStyle, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backArrowIconStyle}
        onPress={() => {}}
      >
        <Icon name={CONSTANT_arrowRight} size={16} color={CONSTANT_black2} />
      </TouchableOpacity>

      <SmartImageV2
        source={{
          uri:
            "https://pyt-images.imgix.net/images/web_app/logo/pickyourtrail-logo.png"
        }}
        fallbackSource={{
          uri:
            "https://pyt-images.imgix.net/images/web_app/logo/pickyourtrail-logo.png"
        }}
        resizeMode={"cover"}
        style={styles.logoImageStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    backgroundColor: CONSTANT_white,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5
  },
  backArrowIconStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    transform: [{ scaleX: -1 }]
  },
  logoImageStyle: {
    width: HEADER_LOGO_IMAGE_WIDTH,
    height: HEADER_LOGO_IMAGE_HEIGHT
  }
});

export default ExploreHeader;
