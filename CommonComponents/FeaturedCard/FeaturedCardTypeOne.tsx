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
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
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

interface FeaturedCardTypeOneProps {
  containerStyle?: StyleProp<ImageStyle>;
  image: ImageSourcePropType;
  fallbackImage?: ImageSourcePropType;
  blurRadius?: number;
  action: () => any;
  price: string;
}

const FEATURED_CARD_IMAGE_WIDTH = responsiveWidth(65);
const FEATURED_CARD_IMAGE_HEIGHT = ratioCalculator(
  8,
  11,
  FEATURED_CARD_IMAGE_WIDTH
);

const FeaturedCardTypeOne = ({
  containerStyle,
  image = { uri: "" },
  fallbackImage = { uri: CONSTANT_defaultPlaceImage },
  blurRadius = 50,
  action = () => null,
  price
}: FeaturedCardTypeOneProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={action}>
      <SmartImageV2
        source={image}
        fallbackSource={fallbackImage}
        resizeMode="cover"
        style={[styles.bgImageStyle, containerStyle]}
        blurRadius={blurRadius}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.innerCard}>
          <SmartImageV2
            source={image}
            fallbackSource={fallbackImage}
            resizeMode="cover"
            style={styles.fgImageStyle}
          />

          <View style={styles.contentStyle}>
            <Text style={styles.textStyle}>
              {" "}
              From <Text style={styles.boldTextStyle}>{price}</Text> / person
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
    width: responsiveWidth(100),
    marginBottom: 32
  },
  imageStyle: {
    borderRadius: 4
  },
  innerCard: {
    padding: 24
  },
  contentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  fgImageStyle: {
    height: FEATURED_CARD_IMAGE_HEIGHT,
    borderRadius: 8,
    marginBottom: 24
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
