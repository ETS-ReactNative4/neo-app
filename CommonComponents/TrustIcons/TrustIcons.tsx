import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Text,
  ImageSourcePropType
} from "react-native";

import SmartImageV2 from "../SmartImage/SmartImageV2";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import { CONSTANT_shade1 } from "../../constants/colorPallete";
import { CONSTANT_defaultPlaceImage } from "../../constants/imageAssets";

interface TrustIconsProps {
  containerStyle?: StyleProp<ViewStyle>;
  image: ImageSourcePropType;
  fallbackImage?: ImageSourcePropType;
  text: string;
}

const TrustIcons = ({
  containerStyle,
  image = { uri: "" },
  fallbackImage = { uri: CONSTANT_defaultPlaceImage },
  text = ""
}: TrustIconsProps) => {
  return (
    <View style={[styles.trustIconsContainer, containerStyle]}>
      <SmartImageV2
        resizeMode={"contain"}
        source={image}
        fallbackSource={fallbackImage}
        style={styles.imageStyle}
      />

      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  trustIconsContainer: {
    width: 80,
    alignItems: "center"
  },
  imageStyle: {
    width: 55,
    height: 55
  },
  textStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 16),
    textAlign: "center"
  }
});

export default TrustIcons;
