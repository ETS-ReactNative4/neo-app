import React from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import { responsiveWidth } from "react-native-responsive-dimensions";

const XSensorPlaceholder = ({ containerStyle }) => {
  if (!isIphoneX()) return null;
  if (!containerStyle) containerStyle = {};
  return (
    <View
      style={[
        { height: constants.xSensorAreaHeight, width: responsiveWidth(100) },
        containerStyle
      ]}
    />
  );
};

XSensorPlaceholder.propTypes = { containerStyle: ViewPropTypes.style };

export default XSensorPlaceholder;
