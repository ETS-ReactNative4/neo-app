import React from "react";
import { View, StyleSheet } from "react-native";
import TravelProfileIntro from "./Components/TravelProfileIntro";

const TravelProfileWelcome = () => {
  return (
    <View style={styles.travelProfileWelcomeContainer}>
      <TravelProfileIntro />
    </View>
  );
};

const styles = StyleSheet.create({
  travelProfileWelcomeContainer: {
    flex: 1
  }
});

export default TravelProfileWelcome;
