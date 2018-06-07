import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import constants from "../../../constants/constants";

const UnregisteredNumber = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={constants.notificationIcon} />
      <View style={styles.errorTextWrapper}>
        <Text
          style={styles.errorText}
        >{`No active bookings linked with this number. If someone else has made this booking, you need an invite from them to access it.`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 24
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 8,
    marginTop: 8
  },
  errorTextWrapper: {
    flexWrap: "wrap"
  },
  errorText: {
    fontFamily: constants.primaryLight,
    fontSize: 12,
    lineHeight: 16
  }
});

export default UnregisteredNumber;
