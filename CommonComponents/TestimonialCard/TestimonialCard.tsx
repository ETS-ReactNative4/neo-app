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
import { responsiveWidth } from "react-native-responsive-dimensions";
import {
  CONSTANT_shade4,
  CONSTANT_white,
  CONSTANT_black1,
  CONSTANT_shade1
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import { CONSTANT_defaultPlaceImage } from "../../constants/imageAssets";
import { CONSTANT_shortMonthAndYear } from "../../constants/styles";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import BetterImage from "../BetterImage/BetterImage";

interface TestimonialCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  image: ImageSourcePropType;
  thumbnail: ImageSourcePropType;
  fallbackImage?: ImageSourcePropType;
  reviewText: string;
  name: string;
  tripType: string;
  region: string;
  date: number;
  action: () => any;
}

const TESTIMONIAL_CARD_WIDTH = responsiveWidth(100) - 48;
const TESTIMONIAL_CARD_HEIGHT = ratioCalculator(40, 23, TESTIMONIAL_CARD_WIDTH);

export const TESTIMONIAL_USER_IMAGE_WIDTH = responsiveWidth(33);
export const TESTIMONIAL_USER_IMAGE_HEIGHT = ratioCalculator(
  24,
  25,
  TESTIMONIAL_USER_IMAGE_WIDTH
);

const TestimonialCard = ({
  containerStyle,
  image = { uri: "" },
  thumbnail = { uri: "" },
  fallbackImage = { uri: CONSTANT_defaultPlaceImage },
  reviewText = "",
  name = "",
  tripType = "",
  region = "",
  date,
  action = () => null
}: TestimonialCardProps) => {
  const gradientOptions = {
    locations: [0.25, 0.5, 0.8, 1],
    colors: [
      "rgba(217, 230, 234, 0.7)",
      "rgba(217, 230, 234, 0.7)",
      "rgba(217, 230, 234, 0.7)",
      "rgba(217, 230, 234, 0.7)"
    ]
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.testimonialCard, containerStyle]}
    >
      <BetterImage
        thumbnailSource={thumbnail}
        resizeMode={"cover"}
        source={image}
        fallbackSource={fallbackImage}
        containerStyle={styles.imageStyle}
      />
      <LinearGradient style={styles.imageStyle} {...gradientOptions} />
      <View style={styles.reviewContent}>
        <Text
          style={styles.reviewTextStyle}
          numberOfLines={3}
          ellipsizeMode={"tail"}
        >
          {reviewText}
        </Text>
        <Text
          style={styles.nameTextStyle}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {name}
        </Text>
        <Text
          style={styles.tripTypeTextStyle}
          numberOfLines={2}
          ellipsizeMode={"tail"}
        >
          {tripType && region && date
            ? `${tripType} trip to ${region} in ${moment(date).format(
                CONSTANT_shortMonthAndYear
              )}`
            : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  testimonialCard: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: CONSTANT_shade4,
    backgroundColor: CONSTANT_white,
    width: TESTIMONIAL_CARD_WIDTH,
    height: TESTIMONIAL_CARD_HEIGHT,
    paddingRight: 16,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  imageStyle: {
    width: TESTIMONIAL_USER_IMAGE_WIDTH,
    height: TESTIMONIAL_USER_IMAGE_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 125
  },
  reviewContent: {
    width: 210
  },
  reviewTextStyle: {
    color: "#148099",
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 24),
    marginBottom: 12
  },
  nameTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 13),
    marginBottom: 4
  },
  tripTypeTextStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13)
  }
});

export default TestimonialCard;
