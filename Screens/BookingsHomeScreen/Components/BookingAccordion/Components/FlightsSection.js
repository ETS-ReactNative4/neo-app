import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import FlightVoucher from "../../../../VoucherScreens/FlightVoucherScreen/FlightVoucher";
import CircleThumbnail from "../../../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import SectionRightPlaceHolder from "./Components/SectionRightPlaceHolder";
import storeService from "../../../../../Services/storeService/storeService";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";

const FlightsSection = ({ section, navigation }) => {
  return (
    <View>
      {section.items.map((flight, index) => {
        let isLast = index === section.items.length - 1;

        return (
          <Flight
            key={index}
            navigation={navigation}
            flight={flight}
            isLast={isLast}
          />
        );
      })}
    </View>
  );
};

FlightsSection.propTypes = {
  section: PropTypes.object.isRequired
};

const Flight = ({ flight, isLast, navigation }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    if (flight.voucher.booked) {
      recordEvent(constants.bookingsHomeAccordionFlightsVoucherClick);
      navigation.navigate("FlightVoucher", { flight });
    } else {
      storeService.infoStore.setInfo(
        constants.bookingProcessText.title,
        constants.bookingProcessText.message,
        constants.bookingProcessingIcon,
        constants.bookingProcessText.actionText
      );
    }
  };

  const timings = flight.allTrips.map(trip => {
    return {
      departure: flight.trips[trip].routes.map(route => {
        return `${route.depMonth} ${
          route.depDateOfMonth
        }, ${route.departureTime.substring(0, 5)}`;
      }),
      arrival: flight.trips[trip].routes.map(route => {
        return `${route.arrMonth} ${
          route.arrDateOfMonth
        }, ${route.arrivalTime.substring(0, 5)}`;
      })
    };
  });

  const airlineLogo = constants.getAirlineIcon(flight.airlineCode);

  /**
   * TODO: Flight Icons Needed
   * */
  return (
    <TouchableOpacity
      onPress={openVoucher}
      style={[styles.contentContainer, customStyle]}
    >
      <View style={styles.iconWrapper}>
        <CircleThumbnail
          image={{ uri: airlineLogo }}
          containerStyle={styles.contentIcon}
          isContain={true}
          defaultImageUri={constants.airLineLogoPlaceHolder}
        />
      </View>
      <View style={styles.contentTextContainer}>
        <View style={styles.contentHeaderWrapper}>
          <Text
            style={styles.contentHeader}
            numberOfLines={2}
            ellipsizeMode={"tail"}
          >{`${timings[0].departure[0]} - ${
            timings[0].arrival[timings[0].arrival.length - 1]
          },${"\n"}${timings[timings.length - 1].departure[0]} - ${
            timings[timings.length - 1].arrival[
              timings[timings.length - 1].arrival.length - 1
            ]
          }`}</Text>
        </View>
        <View style={styles.contentTextWrapper}>
          <Text style={styles.contentText} numberOfLines={2}>
            {flight.text}
          </Text>
        </View>
      </View>
      <SectionRightPlaceHolder isProcessing={!flight.voucher.booked} />
    </TouchableOpacity>
  );
};

Flight.propTypes = {
  flight: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
    borderBottomColor: constants.shade4,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    overflow: "hidden",
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentIcon: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  contentTextContainer: {
    minHeight: 40,
    marginLeft: 16
  },
  contentHeaderWrapper: {
    minHeight: 16,
    justifyContent: "center"
  },
  contentHeader: {
    fontFamily: constants.primaryLight,
    fontSize: 14,
    lineHeight: 14,
    color: constants.shade2
  },
  contentTextWrapper: {
    minHeight: 24,
    maxWidth: responsiveWidth(60),
    justifyContent: "center"
  },
  contentText: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    maxWidth: responsiveWidth(60)
  }
});

export default FlightsSection;
