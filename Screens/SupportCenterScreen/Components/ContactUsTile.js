import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import constants from "../../../constants/constants";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

const ContactUsTile = ({ contactAction }) => {
  return [
    <View key={0} style={styles.contactUsTileContainer}>
      <Text style={styles.contactText}>
        Not found what you are looking for?{" "}
        <Text onPress={contactAction} style={styles.contactLink}>
          Ask Us
        </Text>
      </Text>
    </View>,
    <XSensorPlaceholder key={1} />
  ];
};

ContactUsTile.propTypes = forbidExtraProps({
  contactAction: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  contactUsTileContainer: {
    height: 56,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0, 0, 0, .3)",
    alignItems: "center",
    justifyContent: "center"
  },
  contactText: {
    ...constants.fontCustom(constants.primarySemiBold, 17),
    color: constants.black2,
    ...Platform.select({
      ios: {
        marginTop: 8
      }
    })
  },
  contactLink: {
    textDecorationLine: "underline",
    color: constants.firstColor
  }
});

export default ContactUsTile;
