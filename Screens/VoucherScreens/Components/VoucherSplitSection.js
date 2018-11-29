import React from "react";
import { Text, StyleSheet, View } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const VoucherSplitSection = ({ sections, containerStyle }) => {
  if (!containerStyle) containerStyle = {};
  if (!sections.length) return null;
  return (
    <View style={[styles.splitSection, containerStyle]}>
      {sections.map((section, index) => {
        if (!section) return null;
        return (
          <View key={index} style={styles.textRowWrapper}>
            <Text style={styles.sectionName}>{section.name}</Text>
            <Text style={styles.sectionValue}>{section.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

VoucherSplitSection.propTypes = forbidExtraProps({
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  containerStyle: PropTypes.object
});

const styles = StyleSheet.create({
  splitSection: {
    marginTop: 16
  },
  textRowWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 4
  },
  sectionName: {
    ...constants.font17(constants.primaryLight),
    color: constants.shade2
  },
  sectionValue: {
    ...constants.font17(constants.primaryLight),
    color: constants.black1
  }
});

export default VoucherSplitSection;
