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
import { recordEvent } from "../../../Services/analytics/analyticsService";
import CustomScrollView from "../../../CommonComponents/CustomScrollView/CustomScrollView";
import EmptyScreenPlaceholder from "../../../CommonComponents/EmptyScreenPlaceholder/EmptyScreenPlaceholder";
const resetAction = NavigationActions.navigate({
  routeName: "AppHome",
  action: NavigationActions.navigate({ routeName: "BookedItineraryTabs" })
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
    getUpcomingItineraries: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  };

  selectItinerary = itineraryId => {
    recordEvent(constants.YourBookings.event, {
      click: constants.YourBookings.click.selectItinerary
    });
    const { selectItinerary } = this.props.itineraries;
    selectItinerary(itineraryId, () => {
      const routeName = this.props.navigation.state.routeName;
      if (routeName === "YourBookings") {
        this.props.appState.setTripMode(true);
        this.props.navigation.dispatch(resetAction);
      } else if (routeName === "YourBookingsUniversal") {
        this.props.appState.setTripMode(true);
        this.props.navigation.navigate("BookedItineraryTabs");
      }
    });
  };

  render() {
    const {
      itinerariesList,
      isLoading,
      getUpcomingItineraries,
      goBack
    } = this.props;

    return (
      <CustomScrollView
        refreshing={isLoading}
        onRefresh={getUpcomingItineraries}
      >
        {!itinerariesList.length && !isLoading ? (
          <EmptyScreenPlaceholder
            image={constants.noBookingsIllus}
            body={constants.noBookingsText}
            title={constants.noBookingsTitle}
            buttonText={constants.exploreItinerariesText}
            buttonAction={goBack}
            buttonTextStyle={{
              ...constants.fontCustom(constants.primarySemiBold, 17),
              color: "white"
            }}
            buttonContainerStyle={{ backgroundColor: constants.firstColor }}
            buttonProps={{
              color: constants.firstColor,
              textColor: "white",
              underlayColor: constants.firstColorAlpha(0.8)
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
      </CustomScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default Upcoming;
