import React from "react";
import { Text, StyleSheet, View } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";

const VoucherSplitSection = ({ sections, containerStyle }) => {
  return (
    <View style={styles.splitSection}>
      {sections.map((section, index) => {
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

VoucherSplitSection.propTypes = {
  sections: PropTypes.array.isRequired,
  containerStyle: PropTypes.object
};

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
