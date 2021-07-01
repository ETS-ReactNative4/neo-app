import React from "react";
import { View, Text, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";

const InfoPill = ({
  containerStyle = StyleSheet.create({}),
  info,
  infoColor = constants.black1,
  infoBackgroundColor = constants.shade1
}) => {
  return (
    <View
      style={[
        styles.infoContainer,
        containerStyle,
        { backgroundColor: infoBackgroundColor }
      ]}
    >
      <Text style={[styles.infoText, { color: infoColor }]}>{info}</Text>
    </View>
  );
};

InfoPill.propTypes = {
  containerStyle: ViewPropTypes.style,
  info: PropTypes.string.isRequired,
  infoBackgroundColor: PropTypes.string,
  infoColor: PropTypes.string
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    borderRadius: 50
  },
  infoText: {
    ...constants.fontCustom(constants.primarySemiBold, 12),
    paddingHorizontal: 8
  }
});

export default InfoPill;
