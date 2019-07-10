import React from "react";
import { View } from "react-native";
import _ from "lodash";
import moment from "moment";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";

const FlightsSection = ({ section, navigation, spinValue }) => {
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
            spinValue={spinValue}
          />
        );
      })}
    </View>
  );
};

FlightsSection.propTypes = forbidExtraProps({
  section: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

const Flight = ({ flight, isLast, navigation, spinValue }) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    recordEvent(constants.bookingsHomeAccordionFlightsVoucherClick);
    resolveLinks(false, false, {
      voucherType: constants.flightVoucherType,
      costingIdentifier: flight.key
    });
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

  return (
    <BookingSectionComponent
      spinValue={spinValue}
      containerStyle={customStyle}
      sectionImage={{ uri: airlineLogo }}
      onClick={openVoucher}
      content={flight.text}
      isProcessing={!flight.voucher.booked}
      title={`${moment(timings[0].departure[0], "MMM DD, HH:mm").format(
        "MMM DD"
      )}${
        timings.length > 1
          ? `${" / "}${moment(
              timings[timings.length - 1].departure[0],
              "MMM DD, HH:mm"
            ).format("MMM DD")}`
          : ""
      }`}
      isImageContain={true}
      defaultSource={constants.flightLogoPlaceholderIllus}
      isDataSkipped={_.get(flight, "voucher.skipData")}
      voucherTitle={_.get(flight, "voucher.title")}
    />
  );
};

Flight.propTypes = forbidExtraProps({
  flight: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  spinValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
    .isRequired
});

export default FlightsSection;
