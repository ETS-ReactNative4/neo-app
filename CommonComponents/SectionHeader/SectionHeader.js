import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import _ from "lodash";

const SectionHeader = ({
  sectionName,
  containerStyle = {},
  textStyle = {},
  setOnLayout
}) => {
  const customProps = {};
  if (setOnLayout) customProps.onLayout = setOnLayout;

  return (
    <View style={[styles.sectionContainer, containerStyle]} {...customProps}>
      <View style={styles.textContainer}>
        <Text style={[styles.sectionName, textStyle]}>
          {_.toUpper(sectionName)}
        </Text>
      </View>
      <View style={styles.placeholder} />
    </View>
  );
};

SectionHeader.propTypes = {
  sectionName: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  setOnLayout: PropTypes.func,
  textStyle: PropTypes.object
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 24,
    marginBottom: 16,
    height: 32,
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "white"
  },
  textContainer: {
    alignSelf: "flex-start",
    borderBottomWidth: 1,
    height: 32,
    borderBottomColor: constants.black2
  },
  placeholder: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: constants.shade3
  },
  sectionName: {
    ...constants.font13(constants.primarySemiBold),
    alignSelf: "flex-end",
    color: constants.black2,
    paddingBottom: 13,
    letterSpacing: 1.5
  }
});

export default SectionHeader;
