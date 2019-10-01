import React from "react";
import {
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity,
  Text
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../../constants/constants";

const VisaInfoExpediateButton = ({
  containerStyle = StyleSheet.create({}),
  cta,
  action = () => null
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={[styles.visaInfoExpediateButton, containerStyle]}
    >
      <Text style={styles.ctaText}>{cta}</Text>
    </TouchableOpacity>
  );
};

VisaInfoExpediateButton.propTypes = {
  containerStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({
  visaInfoExpediateButton: {
    backgroundColor: constants.seventeenthColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4
  },
  ctaText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: "white"
  }
});

export default VisaInfoExpediateButton;
