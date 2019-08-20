import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import constants from "../../../constants/constants";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";

const ContactUsTile = ({
  contactText = constants.helpDeskText.faqNotFoundText,
  contactAction
}) => {
  return [
    <View key={0} style={styles.contactUsTileContainer}>
      <Text style={styles.contactText}>{contactText}</Text>
      <SimpleButton
        text={"Message Us"}
        textColor={"white"}
        containerStyle={{ marginBottom: 8, borderRadius: 2 }}
        icon={constants.arrowRight}
        iconSize={12}
        rightIcon={true}
        underlayColor={constants.firstColorAlpha(0.8)}
        action={contactAction}
      />
    </View>,
    <XSensorPlaceholder key={1} containerStyle={styles.xsensorPlaceholder} />
  ];
};

ContactUsTile.propTypes = forbidExtraProps({
  contactAction: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  contactUsTileContainer: {
    backgroundColor: "white",
    borderTopWidth: 2,
    borderTopColor: constants.white1,
    alignItems: "center",
    justifyContent: "center"
  },
  xsensorPlaceholder: {
    backgroundColor: "white"
  },
  contactText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.black1,
    marginVertical: 16
  },
  contactLink: {
    textDecorationLine: "underline",
    color: constants.firstColor
  }
});

export default ContactUsTile;
