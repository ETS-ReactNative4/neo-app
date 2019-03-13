import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const ForexProviderInfo = ({ containerStyle = {} }) => {
  return (
    <View style={[styles.forexProviderContainer, containerStyle]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.forexProviderImage}
          source={constants.flightLogoPlaceholderIllus}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{"Bang for your Buck!"}</Text>
        <Text style={styles.infoText}>{"In partnership with thomas cook"}</Text>
      </View>
    </View>
  );
};

ForexProviderInfo.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
});

const styles = StyleSheet.create({
  forexProviderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 8
  },
  imageContainer: {
    height: 46,
    width: 46,
    borderRadius: 23,
    marginTop: 4,
    overflow: "hidden"
  },
  textContainer: {
    marginLeft: 16
  },
  forexProviderImage: {
    height: 46,
    width: 46,
    borderRadius: 23
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 24, 32),
    color: constants.black1
  },
  infoText: {
    ...constants.fontCustom(constants.primaryLight, 16),
    color: constants.shade2
  }
});

export default ForexProviderInfo;
