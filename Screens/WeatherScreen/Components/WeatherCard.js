import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import getWeatherIcon from "../../../Services/getWeatherIcon/getWeatherIcon";

const WeatherCard = ({
  location,
  date,
  description,
  temperature,
  weatherIcon,
  containerStyle,
  lastUpdated
}) => {
  if (!containerStyle) containerStyle = {};

  return (
    <View style={[styles.weatherCardContainer, containerStyle]}>
      <View style={styles.textContainer}>
        <View style={styles.textWrapper}>
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text
            style={styles.lastUpdatedText}
          >{`Last Updated on ${lastUpdated}`}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Text style={styles.temperature}>{temperature}</Text>
        <View style={styles.temperatureIcon}>
          <Icon name={getWeatherIcon(weatherIcon)} size={46} />
        </View>
      </View>
    </View>
  );
};

WeatherCard.propTypes = {
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  weatherIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired,
  lastUpdated: PropTypes.string.isRequired,
  containerStyle: PropTypes.object
};

const styles = StyleSheet.create({
  weatherCardContainer: {
    marginVertical: 24,
    height: 72,
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
  locationText: {
    ...constants.fontCustom(constants.primaryLight, 20, 24),
    color: constants.black1
  },
  dateText: {
    ...constants.fontCustom(constants.primaryLight, 17, 24),
    color: "rgba(121,5,114,1)"
  },
  descriptionText: {
    ...constants.fontCustom(constants.primaryLight, 13, 16),
    color: constants.black2
  },
  lastUpdatedText: {
    ...constants.fontCustom(constants.primaryLight, 11),
    color: constants.black2
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
    width: 46,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default WeatherCard;
