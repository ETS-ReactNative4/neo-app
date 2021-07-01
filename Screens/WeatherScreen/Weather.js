import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import WeatherCard from "./Components/WeatherCard";
import WeatherChart from "./Components/WeatherChart";
import WeatherTiles from "./Components/WeatherTiles";
import WeatherInactivePlaceholder from "./Components/WeatherInactivePlaceholder";
import { inject, observer } from "mobx-react";
import _ from "lodash";
import Moment from "moment";
import { extendMoment } from "moment-range";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import { isIphoneX } from "react-native-iphone-x-helper";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import DeepLinkHandler from "../../CommonComponents/DeepLinkHandler/DeepLinkHandler";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";

const moment = extendMoment(Moment);

@ErrorBoundary()
@DeepLinkHandler
@inject("weatherStore")
@inject("itineraries")
@observer
class Weather extends Component {
  constructor(props) {
    super(props);

    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => props.navigation.goBack(),
          headerText: "Weather"
        })
    });
  }

  state = {
    isWeatherActive: false
  };

  componentDidMount() {
    this.loadWeather();
  }

  loadWeather = () => {
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
  };

  render() {
    const {
      weather,
      selectWeather,
      isLoading,
      lastUpdated
    } = this.props.weatherStore;

    /**
     * TODO: Loading indicator for weather details
     */
    if (_.isEmpty(weather)) {
      return null;
    }

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
              lastUpdated={lastUpdated}
            />,
            <WeatherChart key={1} selectedDay={selectedDay} />
          ]
        ) : (
          <WeatherInactivePlaceholder />
        )}
        <WeatherTiles
          isLoading={isLoading}
          loadWeather={this.loadWeather}
          weatherArray={weather}
          selectTile={selectWeather}
        />
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
