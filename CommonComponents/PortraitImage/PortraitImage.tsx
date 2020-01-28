import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  ImageStyle
} from "react-native";
import SmartImageV2 from "../SmartImage/SmartImageV2";

interface PortraitImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ImageStyle>;
  imageSource: string;
}

const PortraitImage = ({
  containerStyle,
  imageContainerStyle,
  imageSource = ""
}: PortraitImageProps) => {
  return (
    <View style={[containerStyle]}>
      <SmartImageV2
        resizeMode={"cover"}
        source={{ uri: imageSource }}
        fallbackSource={{ uri: imageSource }}
        style={[styles.imageStyle, imageContainerStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    borderRadius: 4
  }
});

export default PortraitImage;
