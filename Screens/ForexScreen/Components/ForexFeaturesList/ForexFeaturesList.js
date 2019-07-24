import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import ForexFeatureLineItem from "./Component/ForexFeatureLineItem";
import constants from "../../../../constants/constants";

const ForexFeaturesList = ({
  containerStyle = {},
  features,
  hideIcon = false,
  highlight = false,
  lineWidth
}) => {
  return (
    <View
      style={[
        styles.forexFeaturesContainer,
        highlight ? styles.highlight : {},
        containerStyle
      ]}
    >
      {features.map((item, itemIndex) => (
        <ForexFeatureLineItem
          item={item}
          key={itemIndex}
          hideIcon={hideIcon}
          lineWidth={lineWidth}
        />
      ))}
    </View>
  );
};

ForexFeaturesList.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  hideIcon: PropTypes.bool,
  highlight: PropTypes.bool,
  lineWidth: PropTypes.number
});

const styles = StyleSheet.create({
  forexFeaturesContainer: {
    marginHorizontal: 24
  },
  highlight: {
    backgroundColor: constants.firstColorAlpha(0.2),
    borderRadius: 5,
    padding: 8
  }
});

export default ForexFeaturesList;
