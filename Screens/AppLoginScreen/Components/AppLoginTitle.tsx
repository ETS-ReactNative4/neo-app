import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";
import { StyleSheet } from "react-native";
import { CONSTANT_pytLogoWhite } from "../../../constants/imageAssets";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";

export interface AppLoginTitleProps {
  containerStyle?: StyleProp<ViewStyle>;
  skipAction: () => any;
  isSkipVisible?: boolean;
}

const AppLoginTitle = ({
  containerStyle,
  skipAction = () => null,
  isSkipVisible = false
}: AppLoginTitleProps) => {
  return (
    <View style={[styles.appLoginTitleContainer, containerStyle]}>
      <SmartImageV2
        resizeMode="contain"
        style={styles.logoStyle}
        source={CONSTANT_pytLogoWhite}
        fallbackSource={CONSTANT_pytLogoWhite}
      />
      {isSkipVisible ? (
        <Text style={styles.skipText} onPress={skipAction}>
          {"SKIP"}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  appLoginTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logoStyle: {
    height: 60,
    width: 195
  },
  skipText: {
    color: "white",
    textDecorationLine: "underline",
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14)
  }
});

export default AppLoginTitle;
