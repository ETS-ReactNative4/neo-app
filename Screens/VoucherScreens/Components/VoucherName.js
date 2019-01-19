import React from "react";
import { Text, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import getTitleCase from "../../../Services/getTitleCase/getTitleCase";

const VoucherName = ({ name, textStyle = {} }) => {
  return (
    <Text
      style={[styles.name, textStyle]}
      numberOfLines={4}
      ellipsizeMode={"tail"}
    >
      {getTitleCase(name)}
    </Text>
  );
};

VoucherName.propTypes = {
  name: PropTypes.string.isRequired,
  textStyle: PropTypes.object
};

const styles = StyleSheet.create({
  name: {
    fontFamily: constants.primarySemiBold,
    fontSize: 24,
    color: constants.black1
  }
});

export default VoucherName;
