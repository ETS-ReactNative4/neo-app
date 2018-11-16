import React, { Component } from "react";
import { View, Image, Text, StyleSheet, Platform } from "react-native";
import Icon from "../../../../CommonComponents/Icon/Icon";
import constants from "../../../../constants/constants";
import SimpleButton from "../../../../CommonComponents/SimpleButton/SimpleButton";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import FastImage from "react-native-fast-image";

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
  flightClass,
  airlineCode,
  freeCabinBaggage,
  freeCheckInBaggage,
  departureAirportName,
  departureCity,
  arrivalCity,
  arrivalAirportName
}) => {
  const airlineLogo = constants.getAirlineIcon(airlineCode);

  return (
    <View style={styles.flightCard}>
      {isFirst ? <Text style={styles.flightRoute}>{flightRoute}</Text> : null}
      <View style={styles.flightDetails}>
        <View style={styles.providerSection}>
          <FastImage
            source={{ uri: airlineLogo }}
            style={styles.airlineLogo}
            resizeMode={FastImage.resizeMode.contain}
          />
          {/*<Icon size={24} name={constants.aeroplaneIcon} />*/}
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
            {`${departureAirportName ? `${departureAirportName}, ` : ""}${
              departureCity ? departureCity : ""
            }`}
          </Text>
          <Text style={styles.baggageText}>Cabin Baggage</Text>
          <Text style={styles.baggageText}>Free Checkin Baggage</Text>
        </View>
        <View style={styles.timingMiddle}>
          <Icon size={24} name={constants.clockIcon} color={constants.shade2} />
          <Text style={styles.timeText}>{flyTime}</Text>
          {stops && showStops ? (
            <SimpleButton
              text={`${stops} STOP`}
              action={toggleCard}
              containerStyle={{ height: 24, width: 50, marginTop: 0 }}
              textStyle={{
                fontSize: 10,
                marginLeft: -0.5,
                marginTop: -2
              }}
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
            {`${arrivalAirportName ? `${arrivalAirportName}, ` : ""}${
              arrivalCity ? arrivalCity : ""
            }`}
          </Text>
          <Text style={styles.baggageWeight}>{freeCabinBaggage || "NA"}</Text>
          <Text style={styles.baggageWeight}>{freeCheckInBaggage || "NA"}</Text>
        </View>
      </View>
    </View>
  );
};

FlightCard.propTypes = forbidExtraProps({
  isFirst: PropTypes.bool.isRequired,
  departure: PropTypes.string.isRequired,
  arrival: PropTypes.string.isRequired,
  departureText: PropTypes.string.isRequired,
  arrivalText: PropTypes.string.isRequired,
  flyTime: PropTypes.string.isRequired,
  carrierName: PropTypes.string.isRequired,
  flightRoute: PropTypes.string.isRequired,
  stops: PropTypes.number.isRequired,
  showStops: PropTypes.bool.isRequired,
  toggleCard: PropTypes.func.isRequired,
  flightClass: PropTypes.string.isRequired,
  airlineCode: PropTypes.string.isRequired,
  freeCabinBaggage: PropTypes.string.isRequired,
  freeCheckInBaggage: PropTypes.string.isRequired,
  departureAirportName: PropTypes.string.isRequired,
  departureCity: PropTypes.string.isRequired,
  arrivalCity: PropTypes.string.isRequired,
  arrivalAirportName: PropTypes.string.isRequired
});

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
  airlineLogo: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginRight: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  flightProviderWrapper: {
    height: 17,
    marginTop: Platform.OS === "android" ? -8 : -4
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
    marginVertical: 8,
    minHeight: 112,
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
  timeText: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.black2,
    marginVertical: 4
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
