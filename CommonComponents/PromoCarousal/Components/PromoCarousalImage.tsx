import React from "react";
import {
  StyleSheet,
  StyleProp,
  ImageStyle,
  ImageSourcePropType
} from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import SmartImageV2 from "../../SmartImage/SmartImageV2";

interface PromoCarousalImageProps {
  containerStyle?: StyleProp<ImageStyle>;
  image: ImageSourcePropType;
  fallbackImage: ImageSourcePropType;
}

const PromoCarousalImage = ({
  containerStyle,
  image = { uri: "" },
  fallbackImage = { uri: "" }
}: PromoCarousalImageProps) => {
  return (
    <SmartImageV2
      source={image}
      fallbackSource={fallbackImage}
      resizeMode={"cover"}
      style={[styles.imageStyle, containerStyle]}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: responsiveWidth(100) - 32,
    height: 200,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 24
  }
});

export default PromoCarousalImage;
