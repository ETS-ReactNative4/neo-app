import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import ForexFeatureLineItem from "./Component/ForexFeatureLineItem";

const ForexFeaturesList = ({ containerStyle = {}, features }) => {
  return (
    <View style={[styles.forexFeaturesContainer, containerStyle]}>
      {features.map((item, itemIndex) => (
        <ForexFeatureLineItem item={item} key={itemIndex} />
      ))}
    </View>
  );
};

ForexFeaturesList.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  features: PropTypes.arrayOf(PropTypes.string).isRequired
});

const styles = StyleSheet.create({
  forexFeaturesContainer: {
    marginHorizontal: 24
  }
});

export default ForexFeaturesList;
