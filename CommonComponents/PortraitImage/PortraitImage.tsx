import React from "react";
import { View, ViewStyle, StyleProp, ImageStyle, Image } from "react-native";
import { CONSTANT_shade5 } from "../../constants/colorPallete";

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
      <Image
        resizeMode={"cover"}
        source={{ uri: imageSource }}
        style={[{ backgroundColor: CONSTANT_shade5 }, portraitImageStyle]}
      />
    </View>
  );
};
export default PortraitImage;
