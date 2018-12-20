import React from "react";
import { Text, StyleSheet, View } from "react-native";
import constants from "../../../constants/constants";

const VoucherBookedByName = ({ title = "Booked by", name }) => {
  return (
    <View>
      <Text style={styles.bookedBy}>{title}</Text>
      <Text style={styles.leadPassengerNameText}>{name || "NA"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bookedBy: {
    ...constants.fontCustom(constants.primaryLight, 17, 24),
    color: constants.shade2,
    textAlign: "left",
    marginTop: 16
  },
  leadPassengerNameText: {
    ...constants.fontCustom(constants.primarySemiBold, 17, 24),
    color: constants.black1,
    textAlign: "left"
  }
});

export default VoucherBookedByName;
