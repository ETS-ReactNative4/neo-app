import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";

const WeatherTiles = ({ weatherArray, selectTile, activeTile }) => {
  return (
    <ScrollView contentContainerStyle={styles.weatherTileContainer}>
      {weatherArray.map((weather, index) => {
        const clicked = () => selectTile(index);
        return (
          <TouchableOpacity
            onPress={clicked}
            key={index}
            style={[
              styles.weatherTile,
              index === activeTile ? styles.activeTile : {}
            ]}
          >
            <Text style={styles.dayText}>{weather.day}</Text>
            <Text style={styles.cityText}>{weather.city}</Text>
            <Image
              source={constants.notificationIcon}
              style={styles.weatherIcon}
            />
            <Text style={styles.tempText}>
              {weather.tempC}
              <Text style={styles.tempFText}>{` ${weather.tempF}`}</Text>
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  weatherTileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 24
  },
  weatherTile: {
    height: 112,
    width: 104,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderRadius: 4
  },
  activeTile: {
    backgroundColor: "white",
    shadowColor: constants.shade3,
    shadowOffset: {
      height: 5,
      width: 0
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 13
  },
  weatherIcon: {
    height: 32,
    width: 32,
    marginVertical: 8
  },
  dayText: {
    fontFamily: constants.primaryLight,
    fontSize: 13,
    color: constants.shade2
  },
  cityText: {
    fontFamily: constants.primarySemiBold,
    fontSize: 11,
    color: constants.firstColor
  },
  tempText: {
    fontFamily: constants.primaryLight,
    fontSize: 13,
    color: constants.shade1
  },
  tempFText: {
    color: constants.shade2
  }
});

WeatherTiles.propTypes = {
  weatherArray: PropTypes.array.isRequired,
  selectTile: PropTypes.func.isRequired,
  activeTile: PropTypes.number.isRequired
};

export default WeatherTiles;
