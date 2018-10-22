import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import SearchPlaceholder from "../../CommonComponents/SearchPlaceholder/SearchPlaceholder";
import constants from "../../constants/constants";
import DayAhead from "./Components/DayAhead/DayAhead";
import FeedBackSwiper from "./Components/FeedBackSwiper/FeedBackSwiper";

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
    return (
      <ScrollView
        directionalLockEnabled={true}
        scrollEnabled={this.state.scrollEnabled}
        style={styles.tripFeedScrollView}
      >
        <SearchPlaceholder
          action={() => null}
          containerStyle={{ marginHorizontal: 24 }}
        />
        <View style={styles.vacationNameWrapper}>
          <Text style={styles.vacationName}>{"Vacation Name"}</Text>
        </View>
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
  vacationNameWrapper: {
    marginHorizontal: 24
  },
  vacationName: {
    ...constants.fontCustom(constants.primarySemiBold, 24),
    color: constants.black1
  }
});

export default TripFeed;
