import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import CompletedCard from "./CompletedCard";
import constants from "../../../constants/constants";

class Completed extends Component {
  render() {
    return (
      <ScrollView style={styles.completedContainer}>
        <CompletedCard />
        <CompletedCard />
        <CompletedCard />

        <View>
          <Image />
          <Text>{`Cancelled Bookings`}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  completedContainer: {
    borderTopWidth: 1,
    borderTopColor: constants.shade4
  }
});

export default Completed;
