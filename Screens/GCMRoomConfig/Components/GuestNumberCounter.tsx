import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import {
  CONSTANT_addIcon,
  CONSTANT_closeIcon
} from "../../../constants/imageAssets";
import { CONSTANT_firstColor } from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";

export interface GuestNumberCounterProps {
  counterText: string;
  addAction: () => any;
  subAction: () => any;
}

const GuestNumberCounter = ({
  counterText,
  addAction,
  subAction
}: GuestNumberCounterProps) => {
  return (
    <View style={styles.guestCounterContainer}>
      <TouchableOpacity
        onPress={subAction}
        activeOpacity={0.2}
        style={styles.buttonContainer}
      >
        <Icon name={CONSTANT_closeIcon} color={CONSTANT_firstColor} size={8} />
      </TouchableOpacity>
      <Text style={styles.counterText}>{counterText}</Text>
      <TouchableOpacity
        onPress={addAction}
        activeOpacity={0.2}
        style={styles.buttonContainer}
      >
        <Icon name={CONSTANT_addIcon} color={CONSTANT_firstColor} size={8} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  guestCounterContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8
  },
  buttonContainer: {
    height: 32,
    width: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CONSTANT_firstColor,
    alignItems: "center",
    justifyContent: "center"
  },
  counterText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 17),
    color: CONSTANT_firstColor
  }
});

export default GuestNumberCounter;
