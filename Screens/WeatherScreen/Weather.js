import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import WeatherCard from "./Components/WeatherCard";
import constants from "../../constants/constants";
import WeatherChart from "./Components/WeatherChart";
import WeatherTiles from "./Components/WeatherTiles";
import WeatherInactivePlaceholder from "./Components/WeatherInactivePlaceholder";
import { inject, observer } from "mobx-react/custom";
import _ from "lodash";
import Moment from "moment";
import { extendMoment } from "moment-range";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import { isIphoneX } from "react-native-iphone-x-helper";

const moment = extendMoment(Moment);

@inject("weatherStore")
@inject("itineraries")
@observer
class Weather extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Weather"} navigation={navigation} />
    };
  };

  state = {
    isWeatherActive: false
  };

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
    const today = moment();
    const dateDifference = this.props.itineraries.firstDay.diff(today, "days");
    if (dateDifference < 7) {
      this.setState({
        isWeatherActive: true
      });
    }
    this.props.weatherStore.getWeatherDetails(cities);
  }

  render() {
    const { weather, selectWeather } = this.props.weatherStore;

    /**
     * TODO: Loading indicator for weather details
     */
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
        {isIphoneX() ? <XSensorPlaceholder /> : null}
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
