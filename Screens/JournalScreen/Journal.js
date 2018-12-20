import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import constants from "../../constants/constants";
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary({ isRoot: true })
class Journal extends Component {
  render() {
    return (
      <View style={styles.journalContainer}>
        <Image
          source={constants.journalComingSoonIllus}
          resizeMode={"contain"}
          style={styles.journalComingSoonImage}
        />
        <Text style={styles.textTitle}>
          {constants.journalComingSoonText.title}
        </Text>
        <Text style={styles.textContent}>
          {constants.journalComingSoonText.message}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  journalContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  journalComingSoonImage: {
    height: responsiveHeight(30),
    width: responsiveWidth(100) - 48
  },
  textTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 20, 21),
    color: constants.firstColor,
    textAlign: "center",
    marginHorizontal: 24,
    margin: 16
  },
  textContent: {
    ...constants.fontCustom(constants.primarySemiBold, 18, 20),
    color: constants.black2,
    textAlign: "center",
    marginHorizontal: 24
  }
});

export default Journal;
