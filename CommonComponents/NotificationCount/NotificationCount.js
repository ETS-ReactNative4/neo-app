import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";

const NotificationCount = ({ count, containerStyle, textStyle }) => {
  if (!containerStyle) containerStyle = {};

  if (!textStyle) textStyle = {};

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{count}</Text>
    </View>
  );
};

NotificationCount.propTypes = {
  count: PropTypes.number.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: constants.firstColor,
    borderRadius: 12
  },
  text: {
    fontFamily: constants.primaryLight,
    fontSize: 15,
    color: "white"
  }
});

export default NotificationCount;
