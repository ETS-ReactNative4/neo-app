import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Icon from "../../../../CommonComponents/Icon/Icon";
import constants from "../../../../constants/constants";

const FlightCard = () => {
  return (
    <View style={styles.flightCard}>
      <Text style={styles.flightRoute}>{`Kochi → Denpasar`}</Text>
      <View style={styles.flightDetails}>
        <View style={styles.providerSection}>
          <Icon size={24} name={constants.aeroplaneIcon} />
          <Text style={styles.flightProvider}>GoAir 3245</Text>
        </View>
        <View style={styles.flightClassSection}>
          <Text style={styles.flightClass}>Economy</Text>
        </View>
      </View>
      <View>
        <View />
        <View />
        <View />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flightCard: {
    paddingHorizontal: 24
  },
  flightRoute: {
    ...constants.font17(constants.primarySemiBold),
    color: constants.black1
  },
  flightDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8
  },
  providerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  flightProvider: {
    marginLeft: 4,
    ...constants.font17(constants.primaryLight),
    color: constants.shade2
  },
  flightClassSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  flightClass: {
    ...constants.font17(constants.primaryLight),
    color: constants.shade2
  }
});

export default FlightCard;
