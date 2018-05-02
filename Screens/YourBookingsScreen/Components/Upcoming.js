import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  StyleSheet
} from "react-native";
import UpcomingCard from "./UpcomingCard";
import PropTypes from "prop-types";
import EmptyListPlaceholder from "../../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";
import constants from "../../../constants/constants";

class Upcoming extends Component {
  static propTypes = {
    /**
     * Todo: Itinerary Validator!!
     */
    itineraries: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  render() {
    const { itineraries, isLoading } = this.props;

    if (itineraries.length === 0 && !isLoading) {
      return (
        <EmptyListPlaceholder
          text={`No active bookings found on this number. If the booking is made by someone else, you need an invite from them to proceed.`}
          containerStyle={{
            borderTopWidth: 1,
            borderTopColor: constants.shade4,
            marginHorizontal: 24
          }}
          textStyle={{ marginTop: -50 }}
        />
      );
    }

    return (
      <ScrollView>
        {itineraries.map((itinerary, index) => {
          return <UpcomingCard key={index} {...itinerary} />;
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default Upcoming;
