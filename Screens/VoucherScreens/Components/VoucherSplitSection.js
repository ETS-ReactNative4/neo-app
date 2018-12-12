import React from "react";
import { Text, StyleSheet, View } from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const VoucherSplitSection = ({
  sections,
  containerStyle = {},
  leftFontStyle = {},
  rightFontStyle = {},
  textWrapperStyle = {}
}) => {
  if (!sections.length) return null;
  return (
    <View style={[styles.splitSection, containerStyle]}>
      {sections.map((section, index) => {
        if (!section) return null;
        return (
          <View key={index} style={[styles.textRowWrapper, textWrapperStyle]}>
            <Text style={[styles.sectionName, leftFontStyle]}>
              {section.name}
            </Text>
            <Text style={[styles.sectionValue, rightFontStyle]}>
              {section.value}
            </Text>
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
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  leftFontStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  rightFontStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  textWrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
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
    ...constants.fontCustom(constants.primaryLight, 17, 24),
    color: constants.shade2,
    marginRight: 8
  },
  sectionValue: {
    ...constants.fontCustom(constants.primaryLight, 17, 24),
    color: constants.black1,
    marginLeft: 8
  }
});

export default VoucherSplitSection;
