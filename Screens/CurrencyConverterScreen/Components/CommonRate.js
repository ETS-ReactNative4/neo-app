import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";

const CommonRate = ({
  foreignAmount,
  foreignCurrency,
  nativeAmount,
  nativeCurrency,
  componentStyle
}) => {
  if (!componentStyle) componentStyle = {};

  return (
    <View style={[styles.container, componentStyle]}>
      <Text style={styles.font}>
        {foreignAmount} {foreignCurrency}
      </Text>
      <Text style={styles.font}>
        {nativeAmount} {nativeCurrency}
      </Text>
    </View>
  );
};

CommonRate.propTypes = {
  foreignAmount: PropTypes.number.isRequired,
  foreignCurrency: PropTypes.string.isRequired,
  nativeAmount: PropTypes.number.isRequired,
  nativeCurrency: PropTypes.string.isRequired,
  componentStyle: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },
  font: {
    ...constants.font17(constants.primaryLight),
    color: constants.shade2
  }
});

export default CommonRate;
