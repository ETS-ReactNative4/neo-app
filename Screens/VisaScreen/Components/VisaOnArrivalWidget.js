import React from "react";
import { View, StyleSheet, ViewPropTypes, Image, Text } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import { responsiveWidth } from "react-native-responsive-dimensions";
import AlertWavePattern from "../../../CommonComponents/AlertWidgetPatterns/AlertWavePattern";

const VisaOnArrivalWidget = ({
  containerStyle = StyleSheet.create({}),
  title = "",
  info = ""
}) => {
  return (
    <View style={[styles.visaOnArrivalWidget, containerStyle]}>
      <AlertWavePattern />
      <View style={styles.iconSection}>
        <Icon name={constants.visaIcon} size={30} color={"white"} />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.infoText}>{info}</Text>
      </View>
    </View>
  );
};

VisaOnArrivalWidget.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  info: PropTypes.string
};

const styles = StyleSheet.create({
  visaOnArrivalWidget: {
    flexDirection: "row",
    backgroundColor: constants.themeDarkBlue,
    borderRadius: 4,
    padding: 24
  },
  iconSection: {
    marginRight: 16
  },
  textSection: {},
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 16, 24),
    color: "white",
    width: responsiveWidth(60)
  },
  infoText: {
    ...constants.fontCustom(constants.primaryRegular, 16, 24),
    color: "white",
    marginTop: 4,
    width: responsiveWidth(60)
  }
});

export default VisaOnArrivalWidget;
