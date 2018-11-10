import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";

const WeatherTiles = ({ weatherArray, selectTile }) => {
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
              weather.isSelected ? styles.activeTile : {},
              Platform.OS === "android"
                ? index === weatherArray.length - 1
                  ? styles.lastTile
                  : {}
                : {}
            ]}
          >
            <Text style={styles.dayText}>{weather.day}</Text>
            <Text style={styles.cityText}>{weather.city}</Text>
            <View style={styles.weatherIcon}>
              <Icon name={weather.icon} size={32} color={constants.black1} />
            </View>
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
    ...constants.elevationThirteen
  },
  lastTile: {
    marginBottom: 45
  },
  weatherIcon: {
    height: 32,
    width: 32,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center"
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
  selectTile: PropTypes.func.isRequired
};

export default WeatherTiles;
