import React from "react";
import {
  StyleSheet,
  ImageSourcePropType,
  View,
  Text,
  StyleProp,
  TouchableOpacity,
  ImageStyle
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import SmartImageV2 from "../SmartImage/SmartImageV2";
import Icon from "../Icon/Icon";
import { CONSTANT_white1 } from "../../constants/colorPallete";
import {
  CONSTANT_backIcon,
  CONSTANT_defaultPlaceImage
} from "../../constants/imageAssets";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import BetterImage from "../BetterImage/BetterImage";

interface FeaturedCardTypeOneProps {
  containerStyle?: StyleProp<ImageStyle>;
  image: ImageSourcePropType;
  thumbnail: ImageSourcePropType;
  fallbackImage?: ImageSourcePropType;
  blurRadius?: number;
  action: () => any;
  price: string;
}

/* GUTTER SPACER */
const GUTTER_SPACING = 24;

export const FEATURED_CARD_IMAGE_WIDTH =
  responsiveWidth(80) - GUTTER_SPACING * 2;
export const FEATURED_CARD_IMAGE_HEIGHT = ratioCalculator(
  8,
  11,
  FEATURED_CARD_IMAGE_WIDTH
);

const FeaturedCardTypeOne = ({
  containerStyle,
  image = { uri: "" },
  thumbnail = { uri: "" },
  fallbackImage = { uri: CONSTANT_defaultPlaceImage },
  blurRadius = 50,
  action = () => null,
  price
}: FeaturedCardTypeOneProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={action}>
      <SmartImageV2
        source={thumbnail}
        fallbackSource={fallbackImage}
        resizeMode="cover"
        style={[styles.bgImageStyle, containerStyle]}
        blurRadius={blurRadius}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.innerCard}>
          <BetterImage
            source={image}
            thumbnailSource={thumbnail}
            fallbackSource={fallbackImage}
            resizeMode="cover"
            containerStyle={styles.fgImageStyle}
          />

          <View style={styles.contentStyle}>
            <Text style={styles.textStyle}>
              {" "}
              From <Text style={styles.boldTextStyle}>₹ {price}</Text> / person
            </Text>

            <View style={styles.backArrowStyle}>
              <Icon
                name={CONSTANT_backIcon}
                size={18}
                color={CONSTANT_white1}
              />
            </View>
          </View>
        </View>
      </SmartImageV2>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bgImageStyle: {
    borderRadius: 4
  },
  imageStyle: {
    borderRadius: 4
  },
  innerCard: {
    padding: GUTTER_SPACING
  },
  contentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  fgImageStyle: {
    height: FEATURED_CARD_IMAGE_HEIGHT,
    borderRadius: 8,
    marginBottom: GUTTER_SPACING
  },
  textStyle: {
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16)
  },
  boldTextStyle: {
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16)
  },
  backArrowStyle: {
    transform: [
      {
        scaleX: -1
      }
    ]
  }
});

export default FeaturedCardTypeOne;
