import React from "react";
import {
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
  ImageStyle,
  TouchableOpacity
} from "react-native";
import {
  CONSTANT_black1,
  CONSTANT_white,
  CONSTANT_shade1
} from "../../../constants/colorPallete";
import {
  CONSTANT_primaryRegular,
  CONSTANT_fontCustom
} from "../../../constants/fonts";
import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";
import { CONSTANT_defaultPlaceImage } from "../../../constants/imageAssets";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";

export interface MaritalStatusCardProps {
  imageSource: string;
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress: () => any;
  isSelected: boolean;
  maritalStatusCardWidth: number;
  maritalStatusCardHeight: number;
}

const MARITAL_STATUS_CARD_IMAGE_WIDTH = 68;
const MARITAL_STATUS_CARD_IMAGE_HEIGHT = ratioCalculator(
  136,
  98,
  MARITAL_STATUS_CARD_IMAGE_WIDTH
);

const MaritalStatusCard = ({
  containerStyle,
  imageSource = "",
  text = "",
  imageStyle,
  onPress = () => null,
  isSelected,
  maritalStatusCardWidth,
  maritalStatusCardHeight
}: MaritalStatusCardProps) => {
  const selectedAction = () => {
    onPress();
  };

  const cardHeight = {
    width: maritalStatusCardWidth,
    height: maritalStatusCardHeight
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={selectedAction}
      style={[styles.cardContainerStyle, cardHeight, containerStyle]}
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
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    backgroundColor: CONSTANT_white,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  },
  textStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16)
  },
  image: {
    width: MARITAL_STATUS_CARD_IMAGE_WIDTH,
    height: MARITAL_STATUS_CARD_IMAGE_HEIGHT,
    marginBottom: 32
  },
  unselectedImage: {
    tintColor: CONSTANT_shade1
  }
});

export default MaritalStatusCard;
