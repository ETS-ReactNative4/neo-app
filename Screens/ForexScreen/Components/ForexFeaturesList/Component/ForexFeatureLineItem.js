import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const iconSize = 14;
const textMargin = 8;

const ForexFeatureLineItem = ({
  containerStyle = {},
  item,
  hideIcon = false,
  lineWidth
}) => {
  return (
    <View
      style={[
        styles.forexFeatureLineItemContainer,
        lineWidth ? { width: lineWidth } : {},
        containerStyle
      ]}
    >
      {hideIcon ? null : (
        <View style={styles.iconContainer}>
          <Icon
            name={constants.checkMarkCircle}
            size={iconSize}
            color={constants.firstColor}
          />
        </View>
      )}
      <View
        style={[
          styles.textContainer,
          lineWidth ? { width: lineWidth - iconSize - textMargin } : {}
        ]}
      >
        <Text style={styles.lineItemText}>{item}</Text>
      </View>
    </View>
  );
};

ForexFeatureLineItem.propTypes = forbidExtraProps({
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  item: PropTypes.string.isRequired,
  hideIcon: PropTypes.bool
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
    marginLeft: textMargin
  },
  lineItemText: {
    ...constants.fontCustom(constants.primaryRegular, 15, 20),
    color: constants.shade1
  }
});

export default ForexFeatureLineItem;
