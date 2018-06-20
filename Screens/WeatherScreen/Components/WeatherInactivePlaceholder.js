import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

const WeatherInactivePlaceholder = ({ containerStyle }) => {
  if (!containerStyle) containerStyle = {};

  return (
    <View style={[styles.inactiveWeatherCardContainer, containerStyle]}>
      <View style={styles.weatherCardContainer}>
        <View style={styles.textContainer}>
          <Image
            resizeMode={"contain"}
            style={styles.weatherCardPlaceholder}
            source={constants.weatherCardPlaceholder}
          />
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.temperature}>{`00°`}</Text>
          <Image
            style={styles.temperatureIcon}
            source={constants.notificationIcon}
          />
        </View>
      </View>
      <ImageBackground
        source={constants.weatherGraphInactive}
        style={styles.inactiveWeatherGraph}
        resizeMode={"stretch"}
      >
        <Text
          style={styles.weatherGraphText}
        >{`Detailed weather reports will be available as you get closer to your departure date.`}</Text>
      </ImageBackground>
    </View>
  );
};

WeatherInactivePlaceholder.propTypes = {
  containerStyle: PropTypes.object
};

const styles = StyleSheet.create({
  inactiveWeatherCardContainer: {
    height: 320
  },
  weatherCardContainer: {
    height: 72,
    marginVertical: 24,
    marginHorizontal: 24,
    flexDirection: "row"
  },
  textWrapper: {
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  weatherCardPlaceholder: {
    height: 72,
    width: 192
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  temperature: {
    ...constants.font30(constants.primaryLight),
    color: constants.black1
  },
  temperatureIcon: {
    height: 46,
    width: 46
  },
  inactiveWeatherGraph: {
    height: 200,
    width: responsiveWidth(100),
    alignItems: "center",
    justifyContent: "center"
  },
  weatherGraphText: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.black2,
    marginHorizontal: 48,
    textAlign: "center"
  }
});

export default WeatherInactivePlaceholder;
