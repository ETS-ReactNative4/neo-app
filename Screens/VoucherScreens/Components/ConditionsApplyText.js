import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";

const ConditionsApplyText = ({ containerStyle = {} }) => {
  return (
    <View style={[styles.conditionsApplyContainer, containerStyle]}>
      <Text style={styles.conditionsText}>
        {constants.voucherText.conditionsApplyText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  conditionsApplyContainer: {
    marginBottom: isIphoneX() ? constants.xSensorAreaHeight + 16 : 16
  },
  conditionsText: {
    ...constants.fontCustom(constants.primaryLight, 12),
    color: constants.black1,
    textAlign: "center"
  }
});

export default ConditionsApplyText;
