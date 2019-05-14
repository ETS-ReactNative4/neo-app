import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../constants/constants";

const PaymentInfoText = ({
  title = "",
  text = "",
  containerStyle = {},
  titleStyle = {},
  textStyle = {}
}) => {
  return (
    <View style={[styles.paymentInfoTextContainer, containerStyle]}>
      <Text style={[styles.titleText, titleStyle]}>{title}</Text>
      <Text style={[styles.infoText, textStyle]}>{text}</Text>
    </View>
  );
};

PaymentInfoText.proptypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
});

const styles = StyleSheet.create({
  paymentInfoTextContainer: {},
  titleText: {
    ...constants.fontCustom(constants.primaryLight, 13, 16),
    color: constants.shade1
  },
  infoText: {
    ...constants.font17(constants.primarySemiBold),
    color: constants.black1
  }
});

export default PaymentInfoText;
