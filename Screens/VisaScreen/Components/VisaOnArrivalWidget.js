import React from "react";
import { View, StyleSheet, ViewPropTypes, Image, Text } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";
import Icon from "../../../CommonComponents/Icon/Icon";
import { responsiveWidth } from "react-native-responsive-dimensions";

const VisaOnArrivalWidget = ({
  containerStyle = StyleSheet.create({}),
  title = "",
  info = ""
}) => {
  return (
    <View style={[styles.visaOnArrivalWidget, containerStyle]}>
      <Image source={constants.waveLeftIllus} style={styles.leftWaveImage} />
      <Image source={constants.waveRightIllus} style={styles.rightWaveImage} />
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

const illustrationImageWidth = 72;
const styles = StyleSheet.create({
  visaOnArrivalWidget: {
    height: 134,
    flexDirection: "row",
    backgroundColor: constants.themeDarkBlue,
    borderRadius: 4,
    padding: 24
  },
  leftWaveImage: {
    height: ratioCalculator(720, 518, illustrationImageWidth),
    width: illustrationImageWidth,
    position: "absolute",
    left: 0,
    bottom: 0
  },
  rightWaveImage: {
    height: ratioCalculator(720, 458, illustrationImageWidth),
    width: illustrationImageWidth,
    position: "absolute",
    right: 0,
    top: 0
  },
  iconSection: {
    marginRight: 16
  },
  textSection: {
    marginTop: 8
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 16),
    color: "white",
    width: responsiveWidth(75)
  },
  infoText: {
    ...constants.fontCustom(constants.primaryRegular, 16, 24),
    color: "white",
    marginTop: 4,
    width: responsiveWidth(75)
  }
});

export default VisaOnArrivalWidget;
