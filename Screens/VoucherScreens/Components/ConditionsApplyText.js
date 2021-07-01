import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const ConditionsApplyText = ({
  containerStyle = {},
  text = constants.voucherText.conditionsApplyText
}) => {
  return (
    <View style={[styles.conditionsApplyContainer, containerStyle]}>
      <Text style={styles.conditionsText}>{`*${text}`}</Text>
    </View>
  );
};

ConditionsApplyText.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  text: PropTypes.string
});

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
