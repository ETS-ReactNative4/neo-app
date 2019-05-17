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
  textStyle = {},
  textColor = "white",
  isLeftAligned = true
}) => {
  return (
    <View
      style={[
        styles.paymentInfoTextContainer,
        containerStyle,
        !isLeftAligned ? styles.alignRight : {}
      ]}
    >
      <Text style={[styles.titleText, { color: textColor }, titleStyle]}>
        {title}
      </Text>
      <Text style={[styles.infoText, { color: textColor }, textStyle]}>
        {text}
      </Text>
    </View>
  );
};

PaymentInfoText.proptypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  isLeftAligned: PropTypes.bool
});

const styles = StyleSheet.create({
  paymentInfoTextContainer: {},
  alignRight: {
    alignItems: "flex-end"
  },
  titleText: {
    ...constants.fontCustom(constants.primaryLight, 13, 16)
  },
  infoText: {
    ...constants.font17(constants.primarySemiBold)
  }
});

export default PaymentInfoText;
