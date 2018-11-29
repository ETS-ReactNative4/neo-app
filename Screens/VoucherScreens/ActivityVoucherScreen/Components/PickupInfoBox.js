import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import Icon from "../../../../CommonComponents/Icon/Icon";
import constants from "../../../../constants/constants";

const PickupInfoBox = () => {
  return (
    <View style={styles.pickupInfoBox}>
      <View style={styles.checkBoxContainer}>
        <Icon size={17} color={"white"} name={constants.checkIcon} />
      </View>
      <Text style={styles.pickupInfoText}>
        {"You will be picked up from this address:"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pickupInfoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: constants.eighthColorAlpha(0.2),
    minHeight: 32,
    borderRadius: 3
  },
  checkBoxContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: constants.eighthColor,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  pickupInfoText: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    color: constants.eighthColor,
    marginHorizontal: 4,
    ...Platform.select({
      ios: {
        marginTop: 2
      }
    })
  }
});

export default PickupInfoBox;
