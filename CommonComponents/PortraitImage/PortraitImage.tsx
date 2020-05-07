import React from "react";
import { View, ViewStyle, StyleProp, ImageStyle } from "react-native";
import { CONSTANT_shade5 } from "../../constants/colorPallete";
import SmartImageV2 from "../SmartImage/SmartImageV2";

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
        useFastImage
        resizeMode={"cover"}
        source={{ uri: imageSource }}
        style={[{ backgroundColor: CONSTANT_shade5 }, portraitImageStyle]}
      />
    </View>
  );
};
export default PortraitImage;
