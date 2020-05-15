import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
  ImageStyle
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import {
  CONSTANT_shade3,
  CONSTANT_black1,
  CONSTANT_shade1,
  CONSTANT_shade2
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import Icon from "../Icon/Icon";
import {
  CONSTANT_arrowRight,
  CONSTANT_defaultPlaceImage
} from "../../constants/imageAssets";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import BetterImage from "../BetterImage/BetterImage";

interface TestimonialCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  image: ImageSourcePropType;
  fallbackImage?: ImageSourcePropType;
  thumbnail: ImageSourcePropType;
  text: string;
  price: string;
  action: () => any;
  promoCardImageStyle?: StyleProp<ImageStyle>;
}

export const PROMO_CARD_IMAGE_WIDTH = responsiveWidth(60);
export const PROMO_CARD_IMAGE_HEIGHT = ratioCalculator(
  1,
  1,
  PROMO_CARD_IMAGE_WIDTH
);

const PromoCard = ({
  containerStyle,
  image = { uri: "" },
  thumbnail = { uri: "" },
  fallbackImage = { uri: CONSTANT_defaultPlaceImage },
  text = "",
  price = "",
  action = () => null,
  promoCardImageStyle
}: TestimonialCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.promoCardContainer, containerStyle]}
    >
      <BetterImage
        resizeMode={"cover"}
        source={image}
        thumbnailSource={thumbnail}
        fallbackSource={fallbackImage}
        containerStyle={[styles.imageStyle, promoCardImageStyle]}
      />

      <View style={styles.contentContainer}>
        <View style={styles.contentInner}>
          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={styles.textStyle}
          >
            {text}
          </Text>

          <View style={styles.priceTextStyle}>
            <Text style={styles.rupeeStyle}>₹</Text>
            <Text style={styles.priceText}>{price}</Text>
            <Text style={styles.personTextStyle}>/person</Text>
          </View>
        </View>

        <View>
          <Icon
            name={CONSTANT_arrowRight}
            key={1}
            size={16}
            color={CONSTANT_shade1}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  promoCardContainer: {
    marginRight: 16
  },
  imageStyle: {
    width: PROMO_CARD_IMAGE_WIDTH,
    height: PROMO_CARD_IMAGE_HEIGHT,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 1,
    borderColor: CONSTANT_shade3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  contentInner: {
    width: 248,
    paddingRight: 16
  },
  textStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16),
    marginBottom: 4
  },
  priceTextStyle: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  rupeeStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14),
    marginTop: 1,
    marginRight: 2
  },
  priceText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18)
  },
  personTextStyle: {
    color: CONSTANT_shade2,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13),
    marginTop: 2,
    marginLeft: 2
  }
});

export default PromoCard;
