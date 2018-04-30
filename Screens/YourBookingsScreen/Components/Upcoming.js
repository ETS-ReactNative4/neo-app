import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  StyleSheet
} from "react-native";
import constants from "../../../constants/constants";
import UpcomingCard from "./UpcomingCard";
import PropTypes from "prop-types";

class Upcoming extends Component {
  static propTypes = {
    /**
     * Todo: Itinerary Validator!!
     */
    itineraries: PropTypes.array.isRequired
  };

  render() {
    return (
      <ScrollView>
        {this.props.itineraries.map((itinerary, index) => {
          return <UpcomingCard key={index} {...itinerary} />;
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default Upcoming;
