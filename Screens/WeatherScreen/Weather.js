import React, { Component } from "react";
import { View, StyleSheet, ScrollView, LayoutAnimation } from "react-native";
import WeatherCard from "./Components/WeatherCard";
import constants from "../../constants/constants";
import WeatherChart from "./Components/WeatherChart";
import WeatherTiles from "./Components/WeatherTiles";
import WeatherInactivePlaceholder from "./Components/WeatherInactivePlaceholder";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

@inject("itineraries")
@observer
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
    activeWeatherTile: 0,
    isWeatherActive: false
  };

  selectWeatherTile = index => {
    this.setState({
      activeWeatherTile: index
    });
  };

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  componentDidMount() {
    const cities = _.flattenDeep(
      this.props.itineraries.cities.map(city => {
        const dateRange = moment.range(city.startDay, city.endDay);
        const dateArray = Array.from(dateRange.by("days"));

        return dateArray.map(date => {
          return {
            city: city.city,
            day: date.toDate(),
            lat: city.cityObject.latitude,
            long: city.cityObject.longitude
          };
        });
      })
    );
    console.log(cities);
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
        {this.state.isWeatherActive ? (
          [
            <WeatherCard
              key={0}
              containerStyle={{ marginHorizontal: 24, height: 72 }}
              {...this.state.selectedWeatherInfo}
            />,
            <WeatherChart key={1} />
          ]
        ) : (
          <WeatherInactivePlaceholder />
        )}
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
