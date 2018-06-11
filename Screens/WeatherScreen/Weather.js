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

@inject("weatherStore")
@inject("itineraries")
@observer
class Weather extends Component {
  static navigationOptions = {
    title: "Weather",
    tabBarVisible: false
  };

  state = {
    /**
     * TODO: Set weather active status based on tour date
     */
    isWeatherActive: true
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
    this.props.weatherStore.getWeatherDetails(cities);
  }

  render() {
    const { weather, selectWeather } = this.props.weatherStore;

    if (_.isEmpty(weather)) return null;

    let selectedDay = weather.find(day => {
      return day.isSelected;
    });

    if (!selectedDay) {
      weather[0].isSelected = true;
      selectedDay = weather[0];
    }

    return (
      <View style={styles.weatherContainer}>
        {this.state.isWeatherActive ? (
          [
            <WeatherCard
              key={0}
              containerStyle={{ marginHorizontal: 24, height: 72 }}
              {...selectedDay.widgetDetails}
            />,
            <WeatherChart key={1} selectedDay={selectedDay} />
          ]
        ) : (
          <WeatherInactivePlaceholder />
        )}
        <WeatherTiles weatherArray={weather} selectTile={selectWeather} />
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
