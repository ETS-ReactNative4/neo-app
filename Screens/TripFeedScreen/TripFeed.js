import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import SearchPlaceholder from "../../CommonComponents/SearchPlaceholder/SearchPlaceholder";
import constants from "../../constants/constants";

class TripFeed extends Component {
  static navigationOptions = HomeHeader;

  render() {
    return (
      <ScrollView style={styles.tripFeedContainer}>
        <SearchPlaceholder
          action={() => null}
          containerStyle={{ marginHorizontal: 24 }}
        />
        <View style={styles.vacationNameWrapper}>
          <Text style={styles.vacationName}>{"Vacation Name"}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tripFeedContainer: {
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
