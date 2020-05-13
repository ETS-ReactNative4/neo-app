import React from "react";
import {
  StyleSheet,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
  TouchableOpacity
} from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import SmartImageV2 from "../../SmartImage/SmartImageV2";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";

interface PromoCarousalImageProps {
  containerStyle?: StyleProp<ImageStyle>;
  image: ImageSourcePropType;
  fallbackImage: ImageSourcePropType;
  action: () => any;
}

export const CAROUSEL_IMAGE_WIDTH = responsiveWidth(91);
export const CAROUSEL_IMAGE_HEIGHT = ratioCalculator(
  41,
  25,
  CAROUSEL_IMAGE_WIDTH
);

const PromoCarousalImage = ({
  containerStyle,
  image = { uri: "" },
  fallbackImage = { uri: "" },
  action = () => null
}: PromoCarousalImageProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={action}>
      <SmartImageV2
        source={image}
        fallbackSource={fallbackImage}
        resizeMode={"cover"}
        style={[styles.imageStyle, containerStyle]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: CAROUSEL_IMAGE_WIDTH,
    height: CAROUSEL_IMAGE_HEIGHT,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 24
  }
});

export default PromoCarousalImage;
