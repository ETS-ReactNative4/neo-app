import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  ImageSourcePropType
} from "react-native";

import SmartImageV2 from "../SmartImage/SmartImageV2";

interface SecurePartnerProps {
  containerStyle?: StyleProp<ViewStyle>;
  logo: ImageSourcePropType;
  fallbackLogo: ImageSourcePropType;
}

const SecurePartner = ({
  containerStyle,
  logo = { uri: "" },
  fallbackLogo = { uri: "" }
}: SecurePartnerProps) => {
  return (
    <View style={[styles.partnersSectionContainer, containerStyle]}>
      <SmartImageV2
        resizeMode={"contain"}
        source={logo}
        fallbackSource={fallbackLogo}
        style={styles.imageStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  partnersSectionContainer: {
    width: 80,
    alignItems: "center"
  },
  imageStyle: {
    width: 72,
    height: 24
  }
});

export default SecurePartner;
