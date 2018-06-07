import React, { Component } from "react";
import { View, StyleSheet, ScrollView, LayoutAnimation } from "react-native";
import WeatherCard from "./Components/WeatherCard";
import constants from "../../constants/constants";
import WeatherChart from "./Components/WeatherChart";
import WeatherTiles from "./Components/WeatherTiles";

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
    },
    activeWeatherTile: 0
  };

  selectWeatherTile = index => {
    this.setState({
      activeWeatherTile: index
    });
  };

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render() {
    const weatherArray = [
      {
        day: `Tue 3/12`,
        city: `Ubud`,
        tempC: `22°`,
        tempF: `13°`,
        icon: constants.notificationIcon,
        action: () => {}
      },
      {
        day: `Tue 3/12`,
        city: `Ubud`,
        tempC: `22°`,
        tempF: `13°`,
        icon: constants.notificationIcon,
        action: () => {}
      },
      {
        day: `Tue 3/12`,
        city: `Ubud`,
        tempC: `22°`,
        tempF: `13°`,
        icon: constants.notificationIcon,
        action: () => {}
      },
      {
        day: `Tue 3/12`,
        city: `Ubud`,
        tempC: `22°`,
        tempF: `13°`,
        icon: constants.notificationIcon,
        action: () => {}
      },
      {
        day: `Tue 3/12`,
        city: `Ubud`,
        tempC: `22°`,
        tempF: `13°`,
        icon: constants.notificationIcon,
        action: () => {}
      },
      {
        day: `Tue 3/12`,
        city: `Ubud`,
        tempC: `22°`,
        tempF: `13°`,
        icon: constants.notificationIcon,
        action: () => {}
      }
    ];

    return (
      <View style={styles.weatherContainer}>
        <WeatherCard
          containerStyle={{ marginHorizontal: 24, height: 72 }}
          {...this.state.selectedWeatherInfo}
        />
        <WeatherChart />
        <WeatherTiles
          weatherArray={weatherArray}
          selectTile={this.selectWeatherTile}
          activeTile={this.state.activeWeatherTile}
        />
      </View>
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
