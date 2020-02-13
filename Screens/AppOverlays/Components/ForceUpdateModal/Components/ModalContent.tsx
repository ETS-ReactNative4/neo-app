import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle, Text } from "react-native";
import {
  CONSTANT_primaryRegular,
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../../../constants/fonts";
import {
  CONSTANT_white1,
  CONSTANT_black1,
  CONSTANT_black2,
  CONSTANT_shade1,
  CONSTANT_firstColor
} from "../../../../../constants/colorPallete";
import PrimaryButton from "../../../../../CommonComponents/PrimaryButton/PrimaryButton";

interface ForceUpdateModalProps {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  description: string;
  buttonText: string;
  buttonClickAction: () => any;
  bottomText: string;
  linkText: string;
  linkClickAction: () => any;
  enableSupport?: boolean;
}

const ModalContent = ({
  containerStyle,
  title = "",
  description = "",
  buttonText = "",
  buttonClickAction = () => {},
  bottomText = "",
  linkText = "",
  linkClickAction = () => {},
  enableSupport
}: ForceUpdateModalProps) => {
  return (
    <View style={[styles.forceUpdateModalContainer, containerStyle]}>
      <Text style={styles.titleText}>{title}</Text>

      <Text style={styles.descText} numberOfLines={3} ellipsizeMode={"tail"}>
        {description}
      </Text>

      <PrimaryButton
        text={buttonText}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        clickAction={buttonClickAction}
      />

      {enableSupport ? (
        <Text style={styles.bottomTextStyle}>
          {bottomText}{" "}
          {linkText ? (
            <Text onPress={linkClickAction} style={styles.linkTextStyle}>
              {linkText}
            </Text>
          ) : null}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  forceUpdateModalContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: CONSTANT_white1,
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 32
  },
  titleText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    marginBottom: 16
  },
  descText: {
    color: CONSTANT_black2,
    textAlign: "center",
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15, 20),
    marginBottom: 16
  },
  buttonStyle: {
    height: 44,
    marginBottom: 16
  },
  buttonTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 15)
  },
  bottomTextStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13, 20)
  },
  linkTextStyle: {
    color: CONSTANT_firstColor,
    textDecorationLine: "underline"
  }
});

export default ModalContent;
