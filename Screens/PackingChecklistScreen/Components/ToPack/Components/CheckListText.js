import React from "react";
import PropTypes from "prop-types";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";

const CheckListText = ({ id, item, isComplete }) => {
  return (
    <TouchableHighlight style={styles.touchableContainer}>
      <View style={styles.container}>
        <View style={styles.checkbox} />
        <Text>{item}</Text>
      </View>
    </TouchableHighlight>
  );
};

CheckListText.propTypes = {
  id: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  touchableContainer: {
    minHeight: 24,
    paddingHorizontal: 24,
    marginVertical: 16
  },
  container: {
    flex: 1,
    flexDirection: "row"
  },
  checkbox: {
    height: 16,
    width: 16,
    backgroundColor: "rgba(121,5,114,0.1)"
  }
});

export default CheckListText;
