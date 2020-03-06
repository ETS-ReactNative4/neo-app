import React from "react";
import {
  View,
  ViewStyle,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";
import { CONSTANT_white } from "../../../constants/colorPallete";
import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";
import Icon from "../../../CommonComponents/Icon/Icon";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";
import { CONSTANT_arrowRight } from "../../../constants/imageAssets";

interface GCMBannerProps {
  containerStyle?: ViewStyle;
  bannerImage: string;
  backAction: () => any;
  title: string;
}

const HEADER_CONTAINER_WIDTH = responsiveWidth(100);
const HEADER_CONTAINER_HEIGHT = ratioCalculator(90, 49, HEADER_CONTAINER_WIDTH);

const GCMBanner = ({
  containerStyle,
  bannerImage = "",
  title = "",
  backAction = () => {}
}: GCMBannerProps) => {
  return (
    <View style={[styles.bannerContainer, containerStyle]}>
      <SmartImageV2
        source={{ uri: bannerImage }}
        fallbackSource={{ uri: "" }}
        resizeMode={"cover"}
        style={styles.bannerImageStyle}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={backAction}
          style={styles.backArrowWrapper}
        >
          <View style={styles.backArrowIconStyle}>
            <Icon name={CONSTANT_arrowRight} size={14} color={CONSTANT_white} />
          </View>

          <Text style={styles.backTextStyle}>BACK</Text>
        </TouchableOpacity>

        <Text
          style={styles.titleTextStyle}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {title}
        </Text>
      </SmartImageV2>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: "#000",
    width: HEADER_CONTAINER_WIDTH,
    height: HEADER_CONTAINER_HEIGHT
  },
  bannerImageStyle: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center"
  },
  backArrowWrapper: {
    width: 64,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -4,
    marginBottom: 48
  },
  backArrowIconStyle: {
    transform: [{ scaleX: -1 }]
  },
  backTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 18),
    textTransform: "uppercase",
    paddingLeft: 4
  },
  titleTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 23),
    marginBottom: 12
  }
});

export default GCMBanner;
