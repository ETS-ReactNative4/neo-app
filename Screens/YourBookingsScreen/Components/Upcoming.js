import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  Platform,
  StyleSheet,
  RefreshControl
} from "react-native";
import UpcomingCard from "./UpcomingCard";
import PropTypes from "prop-types";
import EmptyListPlaceholder from "../../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";
import constants from "../../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import { NavigationActions, StackActions } from "react-navigation";
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "AppHome" })]
});

@inject("appState")
@inject("itineraries")
@observer
class Upcoming extends Component {
  static propTypes = {
    tabLabel: PropTypes.string.isRequired,
    itinerariesList: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    getUpcomingItineraries: PropTypes.func.isRequired
  };

  selectItinerary = itineraryId => {
    const { selectItinerary } = this.props.itineraries;
    const { activeScenes } = this.props.appState;
    const previousScene = activeScenes[activeScenes.length - 2];
    selectItinerary(itineraryId);
    if (Platform.OS === "android") {
      if (!previousScene) {
        this.props.navigation.dispatch(resetAction);
      } else {
        this.props.navigation.navigate("AppHome");
      }
    } else {
      this.props.navigation.navigate("AppHome");
    }
  };

  render() {
    const { itinerariesList, isLoading, getUpcomingItineraries } = this.props;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getUpcomingItineraries}
          />
        }
      >
        {!itinerariesList.length && !isLoading ? (
          <EmptyListPlaceholder
            text={`No active bookings found on this number. If the booking is made by someone else, you need an invite from them to proceed.`}
            containerStyle={{
              borderTopWidth: 1,
              borderTopColor: constants.shade4,
              marginHorizontal: 24
            }}
          />
        ) : null}
        {itinerariesList.map((itinerary, index) => {
          let isLast = false;
          if (index === itinerariesList.length - 1) isLast = true;
          return (
            <UpcomingCard
              key={index}
              {...itinerary}
              selectItinerary={this.selectItinerary}
              isLast={isLast}
            />
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default Upcoming;
