import React from "react";
import { View, StyleSheet, ViewPropTypes, Text, Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";

const VisaWindowStatusWidget = ({
  containerStyle = StyleSheet.create({}),
  welcomeText = "",
  dateText = "",
  count,
  fillPercentage,
  countText = ""
}) => {
  return (
    <View style={[styles.visaWindowStatusWidgetContainer, containerStyle]}>
      <Image source={constants.waveLeftIllus} style={styles.leftWaveImage} />
      <Image source={constants.waveRightIllus} style={styles.rightWaveImage} />
      <View style={styles.textSection}>
        <Text style={styles.welcomeText}>{welcomeText}</Text>
        <Text style={styles.dateText}>{dateText}</Text>
        <View style={styles.dividerLine} />
      </View>
      <View style={styles.chartSection}>
        <AnimatedCircularProgress
          duration={2000}
          size={86}
          width={5}
          fill={fillPercentage}
          lineCap={"round"}
          rotation={360}
          tintColor="white"
          backgroundColor="rgba(255,255,255,0.3)"
        >
          {() => (
            <View style={styles.chartTextContainer}>
              <Text style={styles.countNumber}>{count}</Text>
              <Text style={styles.countText}>{countText}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
};

VisaWindowStatusWidget.propTypes = {
  containerStyle: ViewPropTypes.style,
  welcomeText: PropTypes.string,
  dateText: PropTypes.string,
  count: PropTypes.number.isRequired,
  fillPercentage: PropTypes.number.isRequired,
  countText: PropTypes.string
};

const illustrationImageWidth = 72;
const styles = StyleSheet.create({
  visaWindowStatusWidgetContainer: {
    height: 134,
    flexDirection: "row",
    backgroundColor: constants.themeDarkBlue,
    borderRadius: 4,
    paddingVertical: 24
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
  textSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },
  welcomeText: {
    ...constants.fontCustom(constants.primaryRegular, 14, 18),
    color: "white",
    textAlign: "center"
  },
  dateText: {
    ...constants.fontCustom(constants.primarySemiBold, 18),
    color: "white",
    textAlign: "center",
    marginTop: 16,
    width: responsiveWidth(30)
  },
  dividerLine: {
    position: "absolute",
    height: 48,
    width: 1,
    backgroundColor: "white",
    right: 0,
    opacity: 0.2
  },
  chartSection: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  chartTextContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  countNumber: {
    ...constants.fontCustom(constants.primarySemiBold, 17),
    textAlign: "center",
    color: "white"
  },
  countText: {
    ...constants.fontCustom(constants.primaryRegular, 13),
    textAlign: "center",
    color: "white",
    opacity: 0.75
  }
});

export default VisaWindowStatusWidget;
