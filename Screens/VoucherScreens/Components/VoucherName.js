import React from "react";
import { Text, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";

const VoucherName = ({ name, textStyle }) => {
  if (!textStyle) textStyle = {};
  return (
    <Text
      style={[styles.name, textStyle]}
      numberOfLines={2}
      ellipsizeMode={"tail"}
    >
      {name}
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
