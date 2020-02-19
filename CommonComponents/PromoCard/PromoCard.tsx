import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  Text,
  ImageSourcePropType
} from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import SmartImageV2 from "../SmartImage/SmartImageV2";
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
import { CONSTANT_arrowRight } from "../../constants/imageAssets";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";

interface TestimonialCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  image: ImageSourcePropType;
  fallbackImage: ImageSourcePropType;
  text: string;
  price: string;
  action: () => any;
}

const PROMO_CARD_IMAGE_WIDTH = responsiveWidth(100);
const PROMO_CARD_IMAGE_HEIGHT = ratioCalculator(1, 1, PROMO_CARD_IMAGE_WIDTH);

const PromoCard = ({
  containerStyle,
  image = { uri: "" },
  fallbackImage = { uri: "" },
  text = "",
  price = "",
  action = () => null
}: TestimonialCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={action}>
      <View style={[styles.promoCardContainer, containerStyle]}>
        <SmartImageV2
          resizeMode={"cover"}
          source={image}
          fallbackSource={fallbackImage}
          style={styles.imageStyle}
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

            <Text style={styles.priceTextStyle}>
              <Text style={styles.rupeeStyle}>₹</Text> {price}{" "}
              <Text style={styles.personTextStyle}>/person</Text>
            </Text>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  promoCardContainer: {
    marginHorizontal: 16,
    marginBottom: 24
  },
  imageStyle: {
    width: PROMO_CARD_IMAGE_WIDTH - 32,
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
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 20)
  },
  rupeeStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 20)
  },
  personTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13, 20),
    color: CONSTANT_shade2
  }
});

export default PromoCard;
