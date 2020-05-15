import React from "react";
import {
  StyleSheet,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
  TouchableOpacity
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";
import BetterImage from "../../BetterImage/BetterImage";

interface PromoCarousalImageProps {
  containerStyle?: StyleProp<ImageStyle>;
  image: ImageSourcePropType;
  thumbnail: ImageSourcePropType;
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
  thumbnail = { uri: "" },
  fallbackImage = { uri: "" },
  action = () => null
}: PromoCarousalImageProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={action}>
      <BetterImage
        thumbnailSource={thumbnail}
        source={image}
        fallbackSource={fallbackImage}
        resizeMode={"cover"}
        containerStyle={[styles.imageStyle, containerStyle]}
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
