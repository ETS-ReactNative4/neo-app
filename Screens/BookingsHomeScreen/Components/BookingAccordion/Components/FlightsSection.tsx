import React from "react";
import { View } from "react-native";
import _ from "lodash";
import moment from "moment";
import constants from "../../../../../constants/constants";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";
import BookingSectionComponent from "../../../../../CommonComponents/BookingSectionComponent/BookingSectionComponent";
import resolveLinks from "../../../../../Services/resolveLinks/resolveLinks";
import { IFlightCosting } from "../../../../../TypeInterfaces/IItinerary";
import { NavigationStackProp } from "react-navigation-stack";

export interface FlightsSectionProps {
  section: { items: IFlightCosting[] };
  navigation: NavigationStackProp;
  spinValue: object;
}

const FlightsSection = ({
  section,
  navigation,
  spinValue
}: FlightsSectionProps) => {
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

export interface IFlightSectionProps {
  flight: IFlightCosting;
  isLast: boolean;
  navigation: NavigationStackProp;
  spinValue: object;
}

const Flight = ({ flight, isLast, spinValue }: IFlightSectionProps) => {
  let customStyle = {};
  if (isLast) {
    customStyle = {
      // borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 16
    };
  }

  const openVoucher = () => {
    recordEvent(constants.Bookings.event, {
      click: constants.Bookings.click.accordionVoucher,
      type: constants.Bookings.type.flights
    });
    // @ts-ignore
    resolveLinks(false, false, {
      voucherType: constants.flightVoucherType,
      costingIdentifier: flight.configKey
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
      isDataSkipped={_.get(flight, "voucher.skipVoucher")}
      voucherTitle={_.get(flight, "voucher.title")}
    />
  );
};

export default FlightsSection;
