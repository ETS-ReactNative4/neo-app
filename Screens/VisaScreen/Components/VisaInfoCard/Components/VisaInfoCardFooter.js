import React from "react";
import { View, StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import { responsiveWidth } from "react-native-responsive-dimensions";
import changeColorAlpha from "../../../../../Services/changeColorAlpha/changeColorAlpha";
import constants from "../../../../../constants/constants";

const VisaInfoCardFooter = ({
  icon,
  text,
  color,
  containerStyle = StyleSheet.create({})
}) => {
  return (
    <View
      style={[
        styles.visaInfoCardFooterContainer,
        { backgroundColor: changeColorAlpha(color, 0.2) },
        containerStyle
      ]}
    >
      <View style={[styles.iconWrapper, { backgroundColor: color }]}>
        <Icon name={icon} size={13} color={"white"} />
      </View>
      <Text style={[styles.footerText, { color }]}>{text}</Text>
    </View>
  );
};

VisaInfoCardFooter.propTypes = {
  containerStyle: ViewPropTypes.style,
  icon: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string
};

const styles = StyleSheet.create({
  visaInfoCardFooterContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 24,
    alignItems: "flex-start"
  },
  iconWrapper: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8
  },
  footerText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 22),
    marginRight: 24
  }
});

export default VisaInfoCardFooter;
