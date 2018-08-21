import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";

const PrimaryTool = ({ text, action, containerStyle, toolIcon }) => {
  return (
    <TouchableOpacity
      style={[styles.primaryContainer, containerStyle || {}]}
      onPress={action}
    >
      <Image source={toolIcon} style={styles.toolIcon} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

PrimaryTool.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  toolIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired
};

const maxWidth = responsiveWidth(100) - 48;
const containerWidth = maxWidth / 3 * 2 - 8;
const styles = StyleSheet.create({
  primaryContainer: {
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 104,
    width: containerWidth,
    borderWidth: 1,
    borderColor: constants.shade4,
    backgroundColor: "white",
    shadowColor: constants.shade3,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 2
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 16
  },
  toolIcon: {
    height: 64,
    width: 64,
    margin: 20
  },
  text: {
    fontFamily: constants.primaryLight,
    color: constants.black2,
    fontSize: 13
  }
});

export default PrimaryTool;
