import React from "react";
import { Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../../../constants/constants";

const CheckListSection = ({ section }) => {
  if (!section.data.length) return null;
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{section.title}</Text>
    </View>
  );
};

CheckListSection.propTypes = {
  section: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 24,
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "white"
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 19),
    color: constants.black1
  }
});

export default CheckListSection;
