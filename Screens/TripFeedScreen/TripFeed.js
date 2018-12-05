import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import constants from "../../constants/constants";
import DayAhead from "./Components/DayAhead/DayAhead";
import FeedBackSwiper from "./Components/FeedBackSwiper/FeedBackSwiper";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import ItineraryHeader from "./Components/ItineraryHeader/ItineraryHeader";
import ContentImageSection from "./Components/ContentImageSection/ContentImageSection";
import TripViewLite from "./Components/TripViewLite/TripViewLite";
import TripView from "./Components/TripView/TripView";
import TripHighlights from "./Components/TripHighlights/TripHighlights";

@ErrorBoundary({ isRoot: true })
class TripFeed extends Component {
  static navigationOptions = HomeHeader;

  state = {
    scrollEnabled: true
  };

  toggleScrollLock = status => {
    this.setState({
      scrollEnabled: status
    });
  };

  render() {
    const tripData = [
      {
        title: "Chennai",
        icon: "FLIGHT",
        period: "May 14-15",
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      {
        title: "Barcelona",
        icon: "FLIGHT",
        period: "May 17-18",
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      {
        title: "Sevilla",
        icon: "CAR",
        period: "May 17",
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      {
        title: "Sevilla",
        icon: "TRAIN",
        period: "May 17",
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      {
        title: "Sevilla",
        icon: "FERRY",
        period: "May 18",
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      },
      {
        title: "Sevilla",
        icon: "BUS",
        period: "May19",
        image:
          "https://www.larousse.fr/encyclopedie/data/images/1314562-Barcelone.jpg"
      }
    ];
    return (
      <ScrollView
        directionalLockEnabled={true}
        scrollEnabled={this.state.scrollEnabled}
        style={styles.tripFeedScrollView}
      >
        {/* <SearchPlaceholder */}
        {/*action={() => null}*/}
        {/*containerStyle={{ marginHorizontal: 24 }}*/}
        {/*/>*/}
        {/* <View style={styles.vacationNameWrapper}>
          <Text style={styles.vacationName}>{"Vacation Name"}</Text>
        </View> */}
        <ItineraryHeader
          title="Anand’s Vacation to Europe"
          text="30 days to go..."
          containerStyle={styles.wrapper}
        />
        <TripView data={tripData} containerStyle={{ marginTop: 0 }} />
        <TripViewLite data={tripData} />
        <ContentImageSection
          title="All aboard?"
          text="Invite your buddies. Everyone invited gets access to the vouchers and itinerary."
          buttonText="Invite Contacts"
          containerStyle={{
            marginHorizontal: 24
          }}
        />
        <TripHighlights title={"TRIP HIGHLIGHTS"} data={tripData} />
        <ContentImageSection
          title="Travel adaper needed!"
          text="In Europe, you will need one to power your electronic items."
          buttonText="Buy one"
          imageSrc={constants.infoBoxIllus}
          buttonStyle={{
            width: 75
          }}
          containerStyle={{
            marginHorizontal: 24,
            marginTop: 16
          }}
        />
        <FeedBackSwiper toggleScrollLock={this.toggleScrollLock} />
        <DayAhead />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tripFeedContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  tripFeedScrollView: {
    flex: 1,
    backgroundColor: "white"
  },
  wrapper: {
    marginHorizontal: 24
  }
});

export default TripFeed;
