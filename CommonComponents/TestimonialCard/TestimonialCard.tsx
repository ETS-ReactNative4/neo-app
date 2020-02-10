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
import {
  CONSTANT_shade3,
  CONSTANT_white1,
  CONSTANT_black1,
  CONSTANT_black2,
  CONSTANT_sixteenthColor
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import SmartImageV2 from "../SmartImage/SmartImageV2";

interface TestimonialCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  image: ImageSourcePropType;
  fallbackImage: ImageSourcePropType;
  reviewText: string;
  name: string;
  tripType: string;
  region: string;
  date: string;
  action: () => any;
}

const TestimonialCard = ({
  containerStyle,
  image = { uri: "" },
  fallbackImage = { uri: "" },
  reviewText = "",
  name = "",
  tripType = "",
  region = "",
  date = "",
  action = () => null
}: TestimonialCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={action}>
      <View style={[styles.testimonialCard, containerStyle]}>
        <SmartImageV2
          resizeMode={"cover"}
          source={image}
          fallbackSource={fallbackImage}
          style={styles.imageStyle}
        />
        <View>
          <Text
            style={styles.reviewTextStyle}
            numberOfLines={3}
            ellipsizeMode={"tail"}
          >
            {reviewText}
          </Text>
          <Text style={styles.nameTextStyle}>{name}</Text>
          <Text style={styles.tripTypeTextStyle}>
            {tripType} trip to {region} in {date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  testimonialCard: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: CONSTANT_shade3,
    backgroundColor: CONSTANT_white1,
    width: responsiveWidth(100) - 32,
    height: 184,
    paddingLeft: 24,
    paddingRight: 40,
    paddingVertical: 32,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: 12,
    marginBottom: 24
  },
  imageStyle: {
    width: 120,
    height: 128,
    position: "absolute",
    top: 0,
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 125
  },
  reviewTextStyle: {
    width: 210,
    color: CONSTANT_sixteenthColor,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 24),
    textShadowColor: CONSTANT_white1,
    marginBottom: 12,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  nameTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 13),
    marginBottom: 4
  },
  tripTypeTextStyle: {
    color: CONSTANT_black2,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 13)
  }
});

export default TestimonialCard;
