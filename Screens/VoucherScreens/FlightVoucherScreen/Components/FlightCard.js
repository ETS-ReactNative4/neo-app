import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Icon from "../../../../CommonComponents/Icon/Icon";
import constants from "../../../../constants/constants";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";

const FlightCard = ({
  isFirst,
  departure,
  arrival,
  departureText,
  arrivalText,
  flyTime,
  carrierName,
  flightRoute,
  stops,
  showStops,
  toggleCard,
  flightClass
}) => {
  return (
    <View style={styles.flightCard}>
      {isFirst ? <Text style={styles.flightRoute}>{flightRoute}</Text> : null}
      <View style={styles.flightDetails}>
        <View style={styles.providerSection}>
          <Icon size={24} name={constants.aeroplaneIcon} />
          <View style={styles.flightProviderWrapper}>
            <Text style={styles.flightProvider}>{carrierName}</Text>
          </View>
        </View>
        <View style={styles.flightClassSection}>
          <View style={styles.flightClassWrapper}>
            <Text style={styles.flightClass}>{flightClass}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flightTimingsSection}>
        <View style={styles.timingLeft}>
          <Text style={styles.flightDateText}>{departure}</Text>
          <Text style={styles.flightCode}>{departureText}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode={"tail"}
            style={styles.airportAddress}
          >
            Chatrapati Shivaji International Airport, Chennai, TamilNadu, India
          </Text>
          <Text style={styles.baggageText}>Cabin Baggage</Text>
        </View>
        <View style={styles.timingMiddle}>
          <Icon size={24} name={constants.clockIcon} color={constants.shade2} />
          <Text style={styles.timeText}>{flyTime}</Text>
          {stops && showStops ? (
            <SimpleButton
              text={`${stops} STOP`}
              action={toggleCard}
              containerStyle={{ height: 24, width: 50 }}
              textStyle={{ fontSize: 10, marginTop: 0 }}
              color={"transparent"}
              hasBorder={true}
              textColor={constants.shade1}
            />
          ) : null}
        </View>
        <View style={styles.timingRight}>
          <Text style={styles.flightDateText}>{arrival}</Text>
          <Text style={styles.flightCode}>{arrivalText}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode={"tail"}
            style={styles.airportAddress}
          >
            Changi International Airport, Singapore
          </Text>
          <Text style={styles.baggageWeight}>30Kg/person</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flightCard: {},
  flightRoute: {
    ...constants.font17(constants.primarySemiBold),
    color: constants.black1
  },
  flightDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8
  },
  providerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  flightProviderWrapper: {
    height: 17
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
  flightClassWrapper: {
    height: 20
  },
  flightClass: {
    ...constants.font17(constants.primaryLight, 17),
    color: constants.shade2
  },
  flightTimingsSection: {
    marginTop: 8,
    height: 112,
    flexDirection: "row"
  },
  timingLeft: {
    flex: 1,
    alignItems: "flex-start"
  },
  timingMiddle: {
    flex: 1,
    alignItems: "center"
  },
  timingRight: {
    flex: 1,
    alignItems: "flex-end"
  },
  flightDateText: {
    fontFamily: constants.primarySemiBold,
    fontSize: 15,
    color: constants.thirdColor
  },
  flightCode: {
    fontFamily: constants.primaryLight,
    marginTop: 8,
    fontSize: 20,
    color: constants.black2
  },
  airportAddress: {
    fontFamily: constants.primaryLight,
    fontSize: 10,
    color: constants.black2
  },
  baggageText: {
    marginTop: 8,
    fontFamily: constants.primaryLight,
    fontSize: 13,
    color: constants.shade2
  },
  baggageWeight: {
    marginTop: 8,
    fontFamily: constants.primaryLight,
    fontSize: 13,
    color: constants.black1
  }
});

export default FlightCard;
