import React from "react";
import { View, ViewStyle, StyleProp, ImageStyle } from "react-native";
import SmartImageV2 from "../SmartImage/SmartImageV2";
import { CONSTANT_defaultPlaceImage } from "../../constants/imageAssets";

interface PortraitImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  portraitImageStyle?: StyleProp<ImageStyle>;
  imageSource: string;
}

const PortraitImage = ({
  containerStyle,
  portraitImageStyle,
  imageSource = ""
}: PortraitImageProps) => {
  return (
    <View style={containerStyle}>
      <SmartImageV2
        resizeMode={"cover"}
        source={{ uri: imageSource }}
        fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
        style={portraitImageStyle}
      />
    </View>
  );
};
export default PortraitImage;
