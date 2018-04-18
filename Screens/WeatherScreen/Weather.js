import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import WeatherCard from "./Components/WeatherCard";
import constants from "../../constants/constants";
import WeatherChart from "./Components/WeatherChart";

class Weather extends Component {
  static navigationOptions = {
    title: "Weather",
    tabBarVisible: false
  };

  state = {
    selectedWeatherInfo: {
      location: "Ubud, Indonesia",
      date: "Today, Dec 9, 12pm",
      description: "Feels like 42˚, partly cloudy",
      temperature: "27˚",
      weatherIcon: constants.notificationIcon
    }
  };

  render() {
    return (
      <ScrollView style={styles.weatherContainer}>
        <WeatherCard
          containerStyle={{ marginHorizontal: 24 }}
          {...this.state.selectedWeatherInfo}
        />
        <WeatherChart />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default Weather;
