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
  CONSTANT_shade5
} from "../../../constants/colorPallete";
import {
  CONSTANT_primaryRegular,
  CONSTANT_fontCustom
} from "../../../constants/fonts";
import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";

interface MaritalStatusCardProps {
  imageSource: string;
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress: () => any;
}

const MaritalStatusCard = ({
  containerStyle,
  imageSource = "",
  text = "",
  imageStyle,
  onPress = () => null
}: MaritalStatusCardProps) => {
  const selectedAction = () => {
    onPress();
  };

  return (
    <View style={[styles.cardContainerStyle, containerStyle]}>
      <TouchableOpacity activeOpacity={0.8} onPress={selectedAction}>
        <SmartImageV2
          resizeMode={"cover"}
          source={{ uri: imageSource }}
          fallbackSource={{ uri: imageSource }}
          style={[styles.image, imageStyle]}
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8
  },

  textStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16)
  },
  image: {
    width: 68,
    height: 50,
    marginBottom: 32
  }
});

export default MaritalStatusCard;
