import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import moment from "moment";
import _ from "lodash";
import constants from "../constants/constants";

class Weather {
  @observable _isLoading = false;

  @observable _loadingError = false;

  @persist("list")
  @observable
  _weather = [];

  @observable _lastUpdated = "";

  @action
  reset = () => {
    this._weather = [];
  };

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get weather() {
    return _.compact(toJS(this._weather));
  }

  @computed
  get lastUpdated() {
    return this._lastUpdated;
  }

  @action
  selectWeather = index => {
    this._weather.forEach((weather, weatherIndex) => {
      if (weather)
        this._weather[weatherIndex].isSelected = index === weather.weatherIndex;
    });
  };

  @action
  getWeatherDetails = cities => {
    this._isLoading = true;
    weatherObject = {};
    cities.map((city, index) => {
      const today = moment();
      const cityDay = moment(city.day);
      const dateDifference = cityDay.diff(today, "days");
      if (dateDifference >= 0) {
        apiCall(
          constants.weatherHourlyForecast(
            constants.darkSkyKey,
            city.lat,
            city.long,
            city.day.getTime() / 1000
          ),
          {},
          "GET",
          constants.darkSkyDomain
        ).then(data => {
          if (data.hourly) {
            weatherObject[index] = data;
            const days = Object.keys(weatherObject);
            if (days.length === cities.length) {
              this._lastUpdated = moment().format("MMM DD, hh:mm a");
              this._loadingError = false;
              this._isLoading = false;
              this._weather = days.map((day, dayIndex) => {
                const weatherDetails = weatherObject[day];
                if (!weatherDetails) {
                  return null;
                }
                const city = cities[dayIndex];
                const isToday = moment(
                  weatherDetails.currently.time * 1000
                ).isSame(moment(), "day");
                return {
                  day: moment(city.day).format("ddd D"),
                  weatherIndex: dayIndex,
                  city: city.city,
                  tempC: `${Math.round(weatherDetails.currently.temperature)}˚`,
                  tempF: `${Math.round(
                    weatherDetails.currently.temperature * 9 / 5 + 32
                  )}˚`,
                  icon: weatherDetails.currently.icon,
                  isToday,
                  isSelected: isToday,
                  widgetDetails: {
                    location: city.city,
                    date: `${moment(city.day).format("MMM D")}`,
                    temperature: `${Math.round(
                      weatherDetails.currently.temperature
                    )}˚`,
                    description: `Feels like ${Math.round(
                      weatherDetails.currently.apparentTemperature
                    )}˚, ${weatherDetails.currently.summary}`,
                    weatherIcon: weatherDetails.currently.icon
                  },
                  hourly: weatherDetails.hourly.data.map(
                    (weatherDetail, weatherIndex) => {
                      return {
                        time: moment(weatherDetail.time * 1000).format("h A"),
                        temperature: Math.round(weatherDetail.temperature)
                      };
                    }
                  )
                };
              });
            }
          } else {
            this._loadingError = true;
            this._isLoading = false;
          }
        });
      } else {
        weatherObject[index] = false;
      }
    });
  };
}

export default Weather;
