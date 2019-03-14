import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const ForexFeatureLineItem = ({ containerStyle = {}, item }) => {
  return (
    <View style={[styles.forexFeatureLineItemContainer, containerStyle]}>
      <View style={styles.iconContainer}>
        <Icon
          name={constants.checkMarkCircle}
          size={14}
          color={constants.firstColor}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.lineItemText}>{item}</Text>
      </View>
    </View>
  );
};

ForexFeatureLineItem.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  item: PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  forexFeatureLineItemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 2
  },
  iconContainer: {
    marginTop: 3
  },
  textContainer: {
    marginLeft: 8
  },
  lineItemText: {
    ...constants.fontCustom(constants.primaryRegular, 15, 20),
    color: constants.shade1
  }
});

export default ForexFeatureLineItem;
