import React, { Component } from "react";
import { StyleSheet } from "react-native";
import UpcomingCard from "./UpcomingCard";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import { inject, observer } from "mobx-react";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import CustomScrollView from "../../../CommonComponents/CustomScrollView/CustomScrollView";
import EmptyScreenPlaceholder from "../../../CommonComponents/EmptyScreenPlaceholder/EmptyScreenPlaceholder";
import DebouncedAlert from "../../../CommonComponents/DebouncedAlert/DebouncedAlert";
// import launchPostBooking from "../../../Services/launchPostBooking/launchPostBooking";

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
    goBack: PropTypes.func.isRequired,
    itineraries: PropTypes.object,
    appState: PropTypes.object
  };

  selectItinerary = itineraryId => {
    recordEvent(constants.YourBookings.event, {
      click: constants.YourBookings.click.selectItinerary
    });
    const { selectItinerary } = this.props.itineraries;
    selectItinerary(itineraryId)
      .then(selectedItineraryId => {
        const routeName = this.props.navigation.state.routeName;
        console.log(selectedItineraryId, routeName);
        // launchPostBooking(
        //   routeName,
        //   this.props.navigation,
        //   selectedItineraryId
        // );
      })
      .catch(() => {
        DebouncedAlert("Error!", "Unable to fetch Itinerary Details...");
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
            buttonTextStyle={styles.buttonTextStyle}
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
          if (index === itinerariesList.length - 1) {
            isLast = true;
          }
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

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: "white",
    ...constants.fontCustom(constants.primarySemiBold, 17)
  }
});

export default Upcoming;
