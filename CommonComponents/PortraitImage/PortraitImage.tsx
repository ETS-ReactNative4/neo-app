import React from "react";
import { View, ViewStyle, StyleProp, ImageStyle } from "react-native";
import { CONSTANT_shade5 } from "../../constants/colorPallete";
import BetterImage from "../BetterImage/BetterImage";

interface PortraitImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  portraitImageStyle?: StyleProp<ImageStyle>;
  imageSource: string;
  thumbnailSource: string;
}

const PortraitImage = ({
  containerStyle,
  portraitImageStyle,
  imageSource = "",
  thumbnailSource = ""
}: PortraitImageProps) => {
  return (
    <View style={containerStyle}>
      <BetterImage
        source={{ uri: imageSource }}
        thumbnailSource={{ uri: thumbnailSource }}
        resizeMode={"cover"}
        containerStyle={[
          { backgroundColor: CONSTANT_shade5 },
          portraitImageStyle
        ]}
      />
    </View>
  );
};
export default PortraitImage;
