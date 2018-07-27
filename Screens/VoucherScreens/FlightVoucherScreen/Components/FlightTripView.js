import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import FlightCard from "./FlightCard";
import FlightDivider from "./FlightDivider";
import PropTypes from "prop-types";

class FlightTripView extends Component {
  static propTypes = {
    trip: PropTypes.object.isRequired
  };

  state = {
    isExpanded: false
  };

  toggleFlightCard = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  render() {
    const { routes, flightClass, flyTime } = this.props.trip;

    if (!this.state.isExpanded) {
      const {
        carrierName,
        departureDayOfWeek,
        depMonth,
        depDateOfMonth,
        departureAirportCode,
        departureTime
      } = routes[0];

      const {
        arrivalDayOfWeek,
        arrMonth,
        arrDateOfMonth,
        arrivalAirportCode,
        arrivalTime,
        arrivalCity
      } = routes[routes.length - 1];

      const departure = `${departureDayOfWeek}, ${depDateOfMonth} ${depMonth}`;
      const departureText = `${departureAirportCode} ${departureTime.slice(
        0,
        -3
      )}`;
      const arrival = `${arrivalDayOfWeek}, ${arrDateOfMonth} ${arrMonth}`;
      const arrivalText = `${arrivalAirportCode} ${arrivalTime.slice(0, -3)}`;
      const flightRoute = `${routes[0].departureCity} → ${
        routes[routes.length - 1].arrivalCity
      }`;

      return (
        <View style={styles.flightTripViewContainer}>
          <FlightCard
            key={0}
            isFirst={true}
            departure={departure}
            arrival={arrival}
            departureText={departureText}
            arrivalText={arrivalText}
            flyTime={flyTime}
            carrierName={carrierName}
            flightRoute={flightRoute}
            toggleCard={this.toggleFlightCard}
            stops={routes.length - 1}
            showStops={!this.state.isExpanded}
            flightClass={flightClass}
          />
        </View>
      );
    }

    return (
      <View style={styles.flightTripViewContainer}>
        {routes.map((route, routeIndex) => {
          // need departure year or time in milliseconds
          // flight Class
          // airport name
          // Cabin Baggage
          const {
            carrierName,
            departureDayOfWeek,
            depMonth,
            depDateOfMonth,
            arrivalDayOfWeek,
            arrMonth,
            arrDateOfMonth,
            flyTime,
            departureAirportCode,
            arrivalAirportCode,
            departureTime,
            arrivalTime,
            arrivalCity,
            layoverTime
          } = route;
          const departure = `${departureDayOfWeek}, ${depDateOfMonth} ${depMonth}`;
          const departureText = `${departureAirportCode} ${departureTime.slice(
            0,
            -3
          )}`;
          const arrival = `${arrivalDayOfWeek}, ${arrDateOfMonth} ${arrMonth}`;
          const arrivalText = `${arrivalAirportCode} ${arrivalTime.slice(
            0,
            -3
          )}`;
          const flightRoute = `${routes[0].departureCity} → ${
            routes[routes.length - 1].arrivalCity
          }`;
          const layoverText = `${layoverTime} layover at ${arrivalCity}`;

          return (
            <View key={routeIndex}>
              {[
                <FlightCard
                  key={0}
                  isFirst={routeIndex === 0}
                  departure={departure}
                  arrival={arrival}
                  departureText={departureText}
                  arrivalText={arrivalText}
                  flyTime={flyTime}
                  carrierName={carrierName}
                  flightRoute={flightRoute}
                  toggleCard={this.toggleFlightCard}
                  stops={routes.length - 1}
                  showStops={!this.state.isExpanded}
                  flightClass={flightClass}
                />,
                routeIndex < routes.length - 1 ? (
                  <FlightDivider
                    key={1}
                    onClick={this.toggleFlightCard}
                    layoverText={layoverText}
                  />
                ) : null
              ]}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flightTripViewContainer: {
    marginHorizontal: 24,
    marginVertical: 16
  }
});

export default FlightTripView;
