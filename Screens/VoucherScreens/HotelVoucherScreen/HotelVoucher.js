import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import VoucherHeader from "../Components/VoucherHeader";
import constants from "../../../constants/constants";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import CircleThumbnail from "../../../CommonComponents/CircleThumbnail/CircleThumbnail";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherName from "../Components/VoucherName";
import PassengerName from "./Components/PassengerName";
import VoucherAccordion from "../Components/VoucherAccordion";
import IosCloseButton from "../Components/IosCloseButton";
import VoucherSplitSection from "../Components/VoucherSplitSection";
import VoucherAddressSection from "../Components/VoucherAddressSection";
import moment from "moment";
import VoucherContactActionBar from "../Components/VoucherContactActionBar";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import Icon from "../../../CommonComponents/Icon/Icon";
import ViewVoucherButton from "../Components/ViewVoucherButton";
import FooterStickyActionBar from "../../../CommonComponents/FooterStickyActionBar/FooterStickyActionBar";
import ConditionsApplyText from "../Components/ConditionsApplyText";
import CheckInCheckOut from "../Components/CheckInCheckOut";

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === "ios"
    ? 20
    : 0;

@ErrorBoundary()
class HotelVoucher extends Component {
  static navigationOptions = {
    header: null,
    gestureResponseDistance: {
      vertical: 214 + xHeight
    }
  };

  state = {
    isCloseVisible: true
  };

  headerToggle = status => {
    this.setState({
      isCloseVisible: status
    });
  };

  close = () => {
    this.props.navigation.goBack();
  };

  render() {
    const hotel = this.props.navigation.getParam("hotel", {});

    const {
      checkInDateDisplay,
      checkInMonthDisplay,
      checkInDayOfWeek,
      checkOutDateDisplay,
      checkOutMonthDisplay,
      checkOutDayOfWeek,
      checkInDate,
      checkOutDate,
      name,
      roomsInHotel,
      amenitiesList,
      amenityDisplayList,
      bookingSource,
      imageURL,
      finalPrice,
      mobile,
      lat,
      lon
    } = hotel;

    const {
      rooms,
      voucherId,
      checkInDateTs,
      checkOutDateTs,
      hotelAddress1,
      hotelAddress2,
      bookedTime,
      checkInDate: checkInDateVoucher,
      checkInTime: checkInTimeVoucher,
      checkOutDate: checkOutDateVoucher,
      checkOutTime: checkOutTimeVoucher,
      voucherUrl
    } = hotel.voucher;

    const amenitiesSection = [
      {
        name: "Hotel Amenities",
        component: amenityDisplayList
          ? amenityDisplayList.map((amenity, amenityIndex) => {
              const customStyle = {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: constants.shade4,
                paddingBottom: 8
              };
              return (
                <View
                  key={amenityIndex}
                  style={[
                    styles.amenitiesTextWrapper,
                    amenityIndex === amenityDisplayList.length - 1
                      ? customStyle
                      : {}
                  ]}
                >
                  <Icon
                    name={amenity.iconUrl.replace("vehoicon-", "")}
                    size={18}
                    color={constants.black2}
                  />
                  <Text style={styles.amenitiesText} key={amenityIndex}>
                    {amenity.amenityName}
                  </Text>
                </View>
              );
            })
          : null
      }
    ];

    const bookingDetailSection = [
      {
        name: "Booked on",
        value: bookedTime ? moment(bookedTime).format("DD MMM, YY") : "NA"
      },
      {
        name: "Booking source",
        value: "Pickyourtrail"
      }
    ];

    const bookingPNR = rooms
      ? rooms.reduce((pnrString, room) => {
          if (pnrString) {
            pnrString += `${"\n"}, ${room.bookingReferenceId}`;
          } else {
            pnrString = room.bookingReferenceId;
          }
          return pnrString;
        }, "")
      : "";

    let isRoomRefundable = false;

    return (
      <Fragment>
        <ParallaxScrollView
          bounces={false}
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={214 + xHeight}
          stickyHeaderHeight={this.state.isCloseVisible ? 0 : 48 + xHeight}
          renderStickyHeader={() => (
            <VoucherStickyHeader
              action={this.close}
              text={`Booking ID - ${bookingPNR}`}
            />
          )}
          fadeOutForeground={Platform.OS !== "android"}
          onChangeHeaderVisibility={this.headerToggle}
          renderForeground={() => (
            <VoucherHeader
              infoText={`BOOKING ID`}
              title={bookingPNR}
              menu={() => {}}
              onClickClose={this.close}
              image={{ uri: imageURL }}
            />
          )}
        >
          <CheckInCheckOut
            checkInDate={
              checkInDateVoucher
                ? moment(checkInDateVoucher, "YYYY-MM-DD").format(
                    constants.commonDateFormat
                  )
                : moment(checkInDate, "DD/MMM/YYYY").format(
                    constants.commonDateFormat
                  )
            }
            checkInTime={checkInTimeVoucher || "02:00 pm"}
            checkOutDate={
              checkOutDateVoucher
                ? moment(checkOutDateVoucher, "YYYY-MM-DD").format(
                    "ddd, DD MMM"
                  )
                : moment(checkOutDate, "DD/MMM/YYYY").format("ddd, DD MMM")
            }
            checkOutTime={checkOutTimeVoucher || "11:00 pm"}
          />

          <VoucherName name={name} textStyle={{ marginHorizontal: 24 }} />

          <View style={styles.bookingDetailsRow}>
            <SectionHeader
              sectionName={`BOOKING DETAILS`}
              containerStyle={{ marginBottom: 0 }}
            />
            {roomsInHotel &&
              roomsInHotel.map((room, roomIndex) => {
                let {
                  // leadPassenger, // Gender Needed?
                  name,
                  roomImages,
                  roomPaxInfo,
                  freeBreakfast,
                  freeWireless,
                  refundable,
                  roomConfiguration,
                  roomTypeId,
                  shortCancellationPolicy
                } = room;

                const { adultCount, childAges } = roomConfiguration;

                const roomVoucherDetails =
                  rooms.find(room => room.roomTypeId === roomTypeId) || {};
                let {
                  leadPassenger,
                  otherPassengers,
                  bookingReferenceId
                } = roomVoucherDetails;
                leadPassenger = leadPassenger || {};
                otherPassengers = otherPassengers || [];

                const roomImage = roomImages
                  ? roomImages.length
                    ? { uri: roomImages[0] }
                    : constants.hotelSmallPlaceHolder
                  : constants.hotelSmallPlaceHolder;

                const { checkIn, checkOut } = roomVoucherDetails;
                if (checkIn > 1 && checkOut > 1) {
                  refundable =
                    typeof roomVoucherDetails.refundable === "boolean"
                      ? roomVoucherDetails.refundable
                      : refundable;
                  freeWireless =
                    typeof roomVoucherDetails.freeWireless === "boolean"
                      ? roomVoucherDetails.freeWireless
                      : freeWireless;
                  freeBreakfast =
                    typeof roomVoucherDetails.freeBreakFast === "boolean"
                      ? roomVoucherDetails.freeBreakFast
                      : freeBreakfast;
                }

                if (refundable) isRoomRefundable = true;

                const hotelAmenitySummary = [
                  {
                    name: "Booking Reference ID",
                    value: bookingReferenceId
                  },
                  {
                    name: "Breakfast",
                    value: freeBreakfast ? "Included" : "Not Included"
                  },
                  {
                    name: "Free Wifi",
                    value: freeWireless ? "Included" : "Not Included"
                  },
                  {
                    name: "Booking Type",
                    value: refundable ? "Refundable*" : "Non-Refundable"
                  }
                ];

                return (
                  <View key={roomIndex} style={styles.bookedSuit}>
                    <View style={styles.bookedSuitInfo}>
                      <CircleThumbnail
                        defaultImageUri={constants.hotelSmallPlaceHolder}
                        image={roomImage}
                      />
                      <View style={styles.bookedSuitDetails}>
                        <Text style={styles.bookedSuitType}>{name}</Text>
                        <Text
                          style={styles.suitBookingDetails}
                        >{`Booked for ${adultCount} adult${
                          adultCount > 1 ? "s" : ""
                        } ${
                          childAges.length
                            ? `${childAges.length} child${
                                childAges.length > 1 ? "ren" : ""
                              }`
                            : ""
                        }`}</Text>
                      </View>
                    </View>

                    <PassengerName
                      name={`${leadPassenger.salutation}. ${
                        leadPassenger.firstName
                      } ${leadPassenger.lastName}`}
                    />
                    {otherPassengers &&
                      otherPassengers.map((passenger, passengerIndex) => {
                        return (
                          <PassengerName
                            key={passengerIndex}
                            name={`${passenger.salutation}. ${
                              passenger.firstName
                            } ${passenger.lastName}`}
                          />
                        );
                      })}

                    <View style={styles.hotelDetailsSection}>
                      <VoucherSplitSection sections={hotelAmenitySummary} />
                    </View>
                  </View>
                );
              })}

            {hotelAddress1 || hotelAddress2 ? (
              <VoucherAddressSection
                containerStyle={{ marginTop: 16 }}
                address={hotelAddress1 || hotelAddress2}
              />
            ) : null}

            <VoucherContactActionBar contact={mobile} location={{ lat, lon }} />

            <VoucherAccordion sections={amenitiesSection} />

            <View style={styles.bookingSection}>
              <VoucherSplitSection sections={bookingDetailSection} />
            </View>

            <ViewVoucherButton voucherUrl={voucherUrl} />

            {isRoomRefundable ? <ConditionsApplyText /> : null}
          </View>
        </ParallaxScrollView>
        {Platform.OS === "ios" && this.state.isCloseVisible ? (
          <IosCloseButton clickAction={this.close} />
        ) : null}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  bookingDetailsRow: {
    paddingHorizontal: 24
  },
  bookedSuit: {
    marginTop: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },
  bookedSuitInfo: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center"
  },
  bookedSuitDetails: {
    marginLeft: 8
  },
  bookedSuitType: {
    ...constants.font17(constants.primarySemiBold),
    color: constants.black1
  },
  suitBookingDetails: {
    ...constants.font13(constants.primaryLight),
    color: constants.black2
  },

  hotelDetailsSection: {
    marginTop: 24,
    paddingBottom: 8,
    borderBottomWidth: 0,
    borderBottomColor: constants.shade4
  },
  textRowWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 4
  },
  sectionName: {
    ...constants.font17(constants.primaryLight),
    color: constants.shade2
  },
  sectionValue: {
    ...constants.font17(constants.primaryLight),
    color: constants.black1
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },

  amenitiesTextWrapper: {
    marginTop: 8,
    marginBottom: 4,
    flexDirection: "row"
  },
  amenitiesText: {
    ...constants.fontCustom(constants.primaryLight, 18, 20),
    color: constants.black2,
    marginLeft: 8
  },

  bookingSection: {
    marginVertical: 32
  }
});

export default HotelVoucher;
