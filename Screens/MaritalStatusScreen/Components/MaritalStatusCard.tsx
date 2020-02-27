import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
  ImageStyle,
  TouchableOpacity
} from "react-native";
import {
  CONSTANT_black1,
  CONSTANT_shade5,
  CONSTANT_shade1
} from "../../../constants/colorPallete";
import {
  CONSTANT_primaryRegular,
  CONSTANT_fontCustom
} from "../../../constants/fonts";
import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";
import { CONSTANT_defaultPlaceImage } from "../../../constants/imageAssets";

export interface MaritalStatusCardProps {
  imageSource: string;
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress: () => any;
  isSelected: boolean;
}

const MaritalStatusCard = ({
  containerStyle,
  imageSource = "",
  text = "",
  imageStyle,
  onPress = () => null,
  isSelected
}: MaritalStatusCardProps) => {
  const selectedAction = () => {
    onPress();
  };

  return (
    <View style={[styles.cardContainerStyle, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={selectedAction}
        style={styles.touchableOpacityStyle}
      >
        <SmartImageV2
          resizeMode={"cover"}
          source={{ uri: imageSource }}
          fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
          style={[
            styles.image,
            !isSelected ? styles.unselectedImage : null,
            imageStyle
          ]}
        />
        <Text style={styles.textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    backgroundColor: CONSTANT_shade5,
    borderRadius: 4,
    height: 186,
    justifyContent: "center",
    marginBottom: 8
  },
  touchableOpacityStyle: {
    alignItems: "center"
  },
  textStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16)
  },
  image: {
    width: 68,
    height: 50,
    marginBottom: 32
  },
  unselectedImage: {
    tintColor: CONSTANT_shade1
  }
});

export default MaritalStatusCard;
