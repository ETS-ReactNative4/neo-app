import React, { Component } from "react";
import { View, StyleSheet, LayoutAnimation } from "react-native";
import FlightCard from "./FlightCard";
import FlightDivider from "./FlightDivider";
import PropTypes from "prop-types";
import constants from "../../../../constants/constants";

class FlightTripView extends Component {
  static propTypes = {
    trip: PropTypes.object.isRequired,
    isLast: PropTypes.bool.isRequired
  };

  state = {
    isExpanded: false
  };

  toggleFlightCard = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render() {
    const { isLast } = this.props;
    const { routes, flightClass, flyTime } = this.props.trip;
    const containerStyle = [
      styles.flightTripViewContainer,
      isLast
        ? {}
        : { borderBottomColor: constants.shade4, borderBottomWidth: 1 }
    ];

    /**
     * TODO: Missing Items
     *
       // need departure year or time in milliseconds
       // airport name
       // Cabin Baggage
     */
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
        <View style={containerStyle}>
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
      <View style={containerStyle}>
        {routes.map((route, routeIndex) => {
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
    paddingVertical: 16
  }
});

export default FlightTripView;
