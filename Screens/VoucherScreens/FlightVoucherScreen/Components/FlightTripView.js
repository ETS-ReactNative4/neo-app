import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import FlightCard from "./FlightCard";
import FlightDivider from "./FlightDivider";

class FlightTripView extends Component {
  state = {
    isExpanded: false
  };

  toggleFlightCard = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  render() {
    return (
      <View style={styles.flightTripViewContainer}>
        <FlightCard />
        <FlightDivider onClick={this.toggleFlightCard} layoverText={""} />
        <FlightCard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flightTripViewContainer: {
    marginHorizontal: 24
  }
});

export default FlightTripView;
