import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import constants from "../../../../constants/constants";
import Icon from "../../../../CommonComponents/Icon/Icon";

const TransferInfoBox = () => {
  return (
    <View style={styles.transferInfoBox}>
      <View style={styles.alertContainer}>
        <Icon size={17} color={"white"} name={constants.infoIcon} />
      </View>
      <Text style={styles.transferInfoText}>
        {
          "This is a free activity. You will need to manage your transport to and from this location."
        }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transferInfoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: constants.black1,
    minHeight: 32,
    borderRadius: 3
  },
  alertContainer: {
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  transferInfoText: {
    ...constants.fontCustom(constants.primarySemiBold, 13, 16),
    color: "white",
    marginHorizontal: 4,
    marginVertical: 4,
    ...Platform.select({
      ios: {
        marginTop: 2
      }
    })
  }
});

export default TransferInfoBox;
