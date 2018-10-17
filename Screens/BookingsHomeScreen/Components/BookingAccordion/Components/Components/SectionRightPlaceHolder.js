import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../../../constants/constants";
import forbidExtraProps from "../../../../../../Services/PropTypeValidation/forbidExtraProps";

const SectionRightPlaceHolder = ({ isProcessing, isStayed }) => {
  return (
    <View style={styles.rightPlaceholder}>
      {isProcessing ? (
        <Image
          source={constants.bookingProcessingIcon}
          style={styles.rightPlaceholderIcon}
        />
      ) : null}
      {isStayed ? (
        <Text style={styles.rightPlaceholderText}>Stayed</Text>
      ) : null}
    </View>
  );
};

SectionRightPlaceHolder.propTypes = forbidExtraProps({
  isProcessing: PropTypes.bool,
  isStayed: PropTypes.bool
});

const styles = StyleSheet.create({
  rightPlaceholder: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  rightPlaceholderText: {
    fontFamily: constants.primaryLight,
    fontSize: 10,
    color: constants.black2
  },
  rightPlaceholderIcon: {
    height: 24,
    width: 24
  }
});

export default SectionRightPlaceHolder;
