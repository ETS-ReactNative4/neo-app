import React from "react";
import { View, StyleSheet, ViewStyle, Text, TextStyle } from "react-native";
import Icon from "../../../../CommonComponents/Icon/Icon";
import { CONSTANT_alertFilledIcon } from "../../../../constants/imageAssets";
import constants from "../../../../constants/constants";
import changeColorAlpha from "../../../../Services/changeColorAlpha/changeColorAlpha";

export interface VoucherAlertBoxProps {
  containerStyle?: ViewStyle;
  alertText: string;
  mode: "alert" | "info";
}

const VoucherAlertBox = ({
  containerStyle = StyleSheet.create({}),
  alertText = "",
  mode = "alert"
}: VoucherAlertBoxProps) => {
  if (!alertText) return null;

  let color = constants.seventeenthColor,
    iconName = CONSTANT_alertFilledIcon;

  if (mode === "alert") {
    color = constants.seventeenthColor;
    iconName = CONSTANT_alertFilledIcon;
  }
  if (mode === "info") {
    color = constants.fifteenthColor;
    iconName = constants.checkMarkCircle;
  }

  return (
    <View
      style={[
        styles.voucherAlertBoxContainer,
        { backgroundColor: changeColorAlpha(color, 0.3) },
        containerStyle
      ]}
    >
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={14} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.alertText, { color }]}>{alertText}</Text>
      </View>
    </View>
  );
};

export interface VoucherAlertBoxStyles {
  voucherAlertBoxContainer: ViewStyle;
  iconContainer: ViewStyle;
  textContainer: ViewStyle;
  alertText: TextStyle;
}

const styles = StyleSheet.create<VoucherAlertBoxStyles>({
  voucherAlertBoxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 24
  },
  iconContainer: {
    marginTop: 4
  },
  textContainer: {
    marginLeft: 8
  },
  alertText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 20)
  }
});

export default VoucherAlertBox;
