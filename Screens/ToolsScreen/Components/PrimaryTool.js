import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";

const PrimaryTool = ({ text, action, containerStyle, toolIcon }) => {
  return (
    <TouchableOpacity
      style={[styles.primaryContainer, containerStyle || {}]}
      onPress={action}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Image source={toolIcon} style={styles.toolIcon} />
    </TouchableOpacity>
  );
};

PrimaryTool.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  toolIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired
};

const styles = StyleSheet.create({
  primaryContainer: {
    height: 88,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  textContainer: {
    flex: 1,
    height: 64,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: constants.fifthColor
  },
  toolIcon: {
    height: 80,
    width: 80,
    left: 8,
    bottom: 8,
    position: "absolute"
  },
  text: {
    fontFamily: constants.primaryRegular,
    fontWeight: "600",
    color: constants.black2,
    fontSize: 20,
    lineHeight: 24,
    marginLeft: 96
  }
});

export default PrimaryTool;
