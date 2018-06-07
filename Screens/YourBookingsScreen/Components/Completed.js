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

        <View style={styles.completionLine} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  completedContainer: {
    borderTopWidth: 1,
    borderTopColor: constants.shade4,
    marginHorizontal: 24
  },
  completionLine: {
    height: 1,
    marginTop: 24,
    backgroundColor: constants.shade4
  }
});

export default Completed;
