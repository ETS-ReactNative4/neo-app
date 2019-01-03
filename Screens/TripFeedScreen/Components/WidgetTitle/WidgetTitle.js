import React from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../../../constants/constants";
import { PropTypes } from "prop-types";

const WidgetTitle = ({ title, containerStyle = {}, titleStyle = {} }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.titleText, titleStyle]}>{title}</Text>
    </View>
  );
};

WidgetTitle.propTypes = {
  title: PropTypes.string.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8
  },
  titleText: {
    color: constants.black1,
    ...constants.fontCustom(constants.primaryRegular, 17)
  }
});

export default WidgetTitle;
