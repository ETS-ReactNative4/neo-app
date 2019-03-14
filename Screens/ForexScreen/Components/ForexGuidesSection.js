import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ForexFeaturesList from "./ForexFeaturesList";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../constants/constants";

const ForexGuidesSection = ({ title = "", data = [] }) => {
  const displayList = data.reduce((textArray, item) => {
    textArray.push(item.pointContent);
    return textArray;
  }, []);
  return (
    <View>
      <Text style={styles.forexGuidesTitle}>{title}</Text>
      <ForexFeaturesList
        containerStyle={styles.forexData}
        features={displayList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  forexGuidesTitle: {
    ...constants.font20(constants.primarySemiBold),
    color: constants.black1
  },
  forexData: {
    marginHorizontal: 0,
    marginVertical: 16
  }
});

ForexGuidesSection.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
});

export default ForexGuidesSection;
