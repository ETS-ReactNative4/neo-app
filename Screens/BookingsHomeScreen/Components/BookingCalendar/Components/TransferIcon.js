import React from "react";
import { View, Image, StyleSheet } from "react-native";
import constants from "../../../../../constants/constants";

const TransferIcon = ({ transferType }) => {
  let transferImage;
  switch (transferType) {
    case "TRAIN":
      transferImage = constants.trainIcon;
      break;

    case "FLIGHT":
      transferImage = constants.aeroplaneIcon;
      break;

    default:
      transferImage = false;
  }
  if (!transferImage) return null;

  return (
    <View style={styles.iconContainer}>
      <Image
        style={styles.iconImage}
        resizeMode={"contain"}
        source={transferImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "black",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0
  },
  iconImage: {
    height: 14,
    width: 14,
    borderRadius: 7
  }
});

export default TransferIcon;
