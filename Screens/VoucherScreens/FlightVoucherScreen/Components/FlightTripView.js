import React, { Component } from "react";
import { View, StyleSheet, LayoutAnimation } from "react-native";
import FlightCard from "./FlightCard";
import FlightDivider from "./FlightDivider";
import PropTypes from "prop-types";
import constants from "../../../../constants/constants";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import FlightActionSection from "./FlightActionSection";

class FlightTripView extends Component {
  static propTypes = forbidExtraProps({
    trip: PropTypes.object.isRequired,
    isLast: PropTypes.bool.isRequired,
    airlineCode: PropTypes.string.isRequired,
    excessBaggageInfo: PropTypes.string.isRequired
  });

  state = {
    isExpanded: false
  };

  toggleFlightCard = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  render() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const { isLast, airlineCode, excessBaggageInfo } = this.props;
    const { routes, flightClass, flyTime } = this.props.trip;
    const containerStyle = [
      styles.flightTripViewContainer,
      isLast
        ? {}
        : {
            borderBottomColor: constants.shade4,
            borderBottomWidth: StyleSheet.hairlineWidth
          }
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
        departureTime,
        freeCabinBaggage,
        freeCheckInBaggage,
        departureAirportName,
        departureCity
      } = routes[0];

      const {
        arrivalDayOfWeek,
        arrMonth,
        arrDateOfMonth,
        arrivalAirportCode,
        arrivalTime,
        arrivalCity,
        arrivalAirportName
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
            airlineCode={airlineCode}
            freeCabinBaggage={freeCabinBaggage}
            freeCheckInBaggage={freeCheckInBaggage}
            departureAirportName={departureAirportName}
            departureCity={departureCity}
            arrivalCity={arrivalCity}
            arrivalAirportName={arrivalAirportName}
            excessBaggageInfo={excessBaggageInfo}
            departureAirportCode={departureAirportCode}
            arrivalAirportCode={arrivalAirportCode}
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
            departureAirportName,
            departureCity,
            arrivalCity,
            arrivalAirportName,
            layoverTime,
            freeCabinBaggage,
            freeCheckInBaggage
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
                  airlineCode={airlineCode}
                  freeCabinBaggage={freeCabinBaggage}
                  freeCheckInBaggage={freeCheckInBaggage}
                  departureAirportName={departureAirportName}
                  departureCity={departureCity}
                  arrivalCity={arrivalCity}
                  arrivalAirportName={arrivalAirportName}
                  excessBaggageInfo={excessBaggageInfo}
                  departureAirportCode={departureAirportCode}
                  arrivalAirportCode={arrivalAirportCode}
                />,
                routeIndex < routes.length - 1 ? (
                  <FlightDivider
                    key={2}
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
