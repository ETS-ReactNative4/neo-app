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
import {
  CONSTANT_white,
  CONSTANT_shade1
} from "../../../constants/colorPallete";
import Icon from "../../../CommonComponents/Icon/Icon";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import { CONSTANT_arrowRight } from "../../../constants/imageAssets";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CONSTANT_xNotchHeight } from "../../../constants/styles";
import LinearGradient from "react-native-linear-gradient";
import BetterImage from "../../../CommonComponents/BetterImage/BetterImage";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";
// @ts-ignore
import getSymbolFromCurrency from "currency-symbol-map";
import { getGlobalPriceWithoutSymbol } from "../../ExploreScreen/services/getPriceWithoutSymbol";

interface ItineraryProps {
  containerStyle?: ViewStyle;
  bannerImage: string;
  backAction: () => any;
  smallText?: string;
  title: string;
  itineraryCost?: string;
  displayCurrency?: string;
}

const HEADER_CONTAINER_WIDTH = responsiveWidth(100);
const HEADER_CONTAINER_HEIGHT =
  ratioCalculator(9, 6, HEADER_CONTAINER_WIDTH) +
  (isIphoneX() ? CONSTANT_xNotchHeight : 0);

const ItineraryBanner = ({
  containerStyle,
  bannerImage = "",
  smallText = "",
  title = "",
  backAction = () => {},
  itineraryCost = "",
  displayCurrency = "INR"
}: ItineraryProps) => {
  const gradientOptions = {
    locations: [0.25, 0.5, 0.6, 1],
    colors: [
      "rgba(0,0,0,0.30)",
      "rgba(0,0,0,0.45)",
      "rgba(0,0,0,0.65)",
      "rgba(0,0,0,0.85)"
    ]
  };

  return (
    <View style={[styles.bannerContainer, containerStyle]}>
      <BetterImage
        thumbnailSource={{
          uri: getImgIXUrl({
            src: bannerImage,
            DPR: 0.02,
            imgFactor: `h=${HEADER_CONTAINER_HEIGHT}&w=${HEADER_CONTAINER_WIDTH}&crop=fit`
          })
        }}
        source={{
          uri: getImgIXUrl({
            src: bannerImage,
            imgFactor: `h=${HEADER_CONTAINER_HEIGHT}&w=${HEADER_CONTAINER_WIDTH}&crop=fit`
          })
        }}
        fallbackSource={{ uri: "" }}
        resizeMode={"cover"}
        containerStyle={styles.bannerImageStyle}
      >
        <LinearGradient {...gradientOptions} style={styles.gradientView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={backAction}
            style={styles.backArrowWrapper}
          >
            <View style={styles.backArrowIconStyle}>
              <Icon
                name={CONSTANT_arrowRight}
                size={14}
                color={CONSTANT_white}
              />
            </View>

            <Text style={styles.backTextStyle}>BACK</Text>
          </TouchableOpacity>

          <View>
            {smallText ? (
              <Text style={styles.smallTextStyle}>{smallText}</Text>
            ) : null}
            <Text
              style={styles.titleTextStyle}
              numberOfLines={2}
              ellipsizeMode={"tail"}
            >
              {title}
            </Text>

            {itineraryCost ? (
              <View style={styles.priceSection}>
                <Text style={styles.rupeeText}>
                  {getSymbolFromCurrency(displayCurrency)}
                </Text>
                <Text style={styles.priceText}>
                  {getGlobalPriceWithoutSymbol({
                    amount: parseInt(itineraryCost, 10),
                    currency: displayCurrency
                  })}
                </Text>
                {/** PT TODO: Check if this line is needed */}
                {/* <Text style={styles.personText}>/person</Text> */}
              </View>
            ) : null}
          </View>
        </LinearGradient>
      </BetterImage>
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
    flex: 1
  },
  gradientView: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center"
  },
  backArrowWrapper: {
    width: 64,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -4,
    marginBottom: 32
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
  smallTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12),
    textTransform: "uppercase",
    marginBottom: 8
  },
  titleTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 23),
    marginBottom: 12
  },
  priceSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24
  },
  rupeeText: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12),
    marginTop: 1,
    marginRight: 4
  },
  priceText: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20)
  },
  personText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12),
    marginTop: 4,
    marginLeft: 2
  }
});

export default ItineraryBanner;
