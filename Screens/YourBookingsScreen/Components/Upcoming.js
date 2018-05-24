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
import { inject, observer } from "mobx-react/custom";

@inject("itineraries")
@observer
class Upcoming extends Component {
  static propTypes = {
    itinerariesList: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired
  };

  selectItinerary = () => {
    this.props.navigation.navigate("AppHome");
  };

  render() {
    const { itinerariesList, isLoading } = this.props;
    const { selectItinerary } = this.props.itineraries;

    if (itinerariesList.length === 0 && !isLoading) {
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
        {itinerariesList.map((itinerary, index) => {
          return (
            <UpcomingCard
              key={index}
              {...itinerary}
              selectItinerary={this.selectItinerary}
            />
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default Upcoming;
