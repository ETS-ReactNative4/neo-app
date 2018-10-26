import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";

const XSensorPlaceholder = ({ containerStyle }) => {
  if (!isIphoneX()) return null;
  if (!containerStyle) containerStyle = {};
  return (
    <View style={[{ height: constants.xSensorAreaHeight }, containerStyle]} />
  );
};

XSensorPlaceholder.propTypes = { containerStyle: PropTypes.object };

export default XSensorPlaceholder;
