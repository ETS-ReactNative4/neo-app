import React from "react";
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";

const SecondaryTool = ({ icon, action, text, containerStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.secondaryContainer, containerStyle || {}]}
      onPress={action}
      underlayColor={"transparent"}
    >
      <Image resizeMode={"contain"} source={icon} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

SecondaryTool.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

const maxWidth = responsiveWidth(100) - 48;
const containerWidth = maxWidth / 3 - 8;
const styles = StyleSheet.create({
  secondaryContainer: {
    backgroundColor: "white",
    height: 104,
    width: containerWidth,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "flex-start",
    justifyContent: "center",
    borderColor: constants.shade4,
    ...constants.elevationTwo
  },
  icon: {
    height: 32,
    width: 32,
    marginLeft: 16,
    marginBottom: 12
  },
  text: {
    fontFamily: constants.primaryLight,
    marginLeft: 16,
    fontSize: 13,
    color: constants.black2,
    marginRight: 16
  }
});

export default SecondaryTool;
