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

interface PartnersSectionProps {
  containerStyle?: StyleProp<ViewStyle>;
  logo: ImageSourcePropType;
  fallbackLogo: ImageSourcePropType;
  text: string;
}

const PartnersSection = ({
  containerStyle,
  logo = { uri: "" },
  fallbackLogo = { uri: "" },
  text = ""
}: PartnersSectionProps) => {
  return (
    <View style={[styles.partnersSectionContainer, containerStyle]}>
      <SmartImageV2
        resizeMode={"contain"}
        source={logo}
        fallbackSource={fallbackLogo}
        style={styles.imageStyle}
      />

      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  partnersSectionContainer: {
    width: 80,
    alignItems: "center"
  },
  imageStyle: {
    width: 46,
    height: 30,
    marginBottom: 12
  },
  textStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 16),
    textAlign: "center"
  }
});

export default PartnersSection;
