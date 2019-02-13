import React, { Component, Fragment } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import VoucherHeader from "../Components/VoucherHeader";
import constants from "../../../constants/constants";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherName from "../Components/VoucherName";
import VoucherSplitSection from "../Components/VoucherSplitSection";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import { inject, observer } from "mobx-react/custom";
import IosCloseButton from "../Components/IosCloseButton";
import VoucherAccordion from "../Components/VoucherAccordion";
import HTMLView from "react-native-htmlview";
import moment from "moment";
import TitleDate from "../Components/TitleDate";
import VoucherAddressSection from "../Components/VoucherAddressSection";
import PickupInfoBox from "./Components/PickupInfoBox";
import TransferInfoBox from "./Components/TransferInfoBox";
import VoucherContactActionBar from "../Components/VoucherContactActionBar";
import getTitleCase from "../../../Services/getTitleCase/getTitleCase";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { responsiveWidth } from "react-native-responsive-dimensions";
import _ from "lodash";
import ViewVoucherButton from "../Components/ViewVoucherButton";
import FooterStickyActionBar from "../../../CommonComponents/FooterStickyActionBar/FooterStickyActionBar";

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === "ios"
    ? 20
    : 0;

@ErrorBoundary()
@inject("passportDetailsStore")
@observer
class ActivityVoucher extends Component {
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
    const activity = this.props.navigation.getParam("activity", {});

    // Booking Source
    // Starts at time missing
    // numof passenger is 0
    // Booked by detail missing
    // Slot needs proper formatting
    // mode of transfer is missing
    // pickup time not available
    // exact address for pickup
    // Lat-long for opening google maps
    // contact number
    // booked date
    // amount paid
    // refundability status
    const {
      bookingId,
      availabilitySlot,
      duration,
      adults,
      children,
      inclusions,
      exclusions,
      contactNumber,
      bookedTime,
      activityTime,
      transferType,
      departureTimeStr,
      notes: voucherNotes,
      pickupDetail: pickupDetails, // contains array of pickup details
      activityLocation = {},
      activityAddress,
      self,
      voucherUrl
    } = activity.voucher;
    const {
      latitude: activityLatitude,
      longitude: activityLongitude
    } = activityLocation;
    const {
      mainPhoto,
      title,
      notes,
      longDesc,
      latitude: costingLatitude,
      longitude: costingLongitude,
      free,
      selectedTourGrade
    } = activity;
    const {
      ourSourceProvider,
      day,
      dayOfWeek,
      mon,
      totalCost,
      publishedCost,
      dateMillis
    } = activity.costing;
    const {
      inclusion: costingInclusions,
      exclusion: costingExclusions
    } = selectedTourGrade;

    const transferIncluded = _.toUpper(transferType) !== "NOTRANSFER";
    const pickupDetail =
      pickupDetails && pickupDetails.length ? pickupDetails[0] : {};
    const { pickupTime, location = {}, address: pickupAddress } = pickupDetail;

    const { latitude, longitude } = location;

    const {
      leadPassengerName,
      passengerCount
    } = this.props.passportDetailsStore;

    let passengerDetails = [];
    let transferDetails = [];
    let bookingDetails = [];
    let bookingDetailSections = [];

    let voucherTitle = {
      header: "",
      text: ""
    };
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const totalDuration = `${hours ? `${hours} hrs ` : ""}${
      minutes ? `${minutes} mins` : ""
    }`;
    if (free) {
      passengerDetails = [
        {
          name: "Duration",
          value: totalDuration
        },
        {
          name: "Slot",
          value: getTitleCase(availabilitySlot)
        },
        {
          name: "Type",
          value: "Self Exploration"
        }
      ];
      bookingDetailSections = [
        {
          name: "About",
          component: (
            <View style={styles.accordionTextWrapper}>
              <HTMLView
                value={`<div>${longDesc}</div>`}
                stylesheet={constants.htmlStyleSheet}
              />
            </View>
          )
        }
      ];
    } else {
      voucherTitle = {
        header: bookingId ? "BOOKING ID" : "",
        text: bookingId ? bookingId : ""
      };
      if (transferIncluded) {
        transferDetails.push({
          name: "Transfer Type",
          value: transferType
            ? getTitleCase(transferType)
            : selectedTourGrade
              ? getTitleCase(selectedTourGrade.transferType)
              : "NA"
        });
        transferDetails.push({
          name: "Pick up time",
          value: pickupTime
            ? pickupTime
            : selectedTourGrade && selectedTourGrade.departureTime
              ? moment(selectedTourGrade.departureTime, "HHmm").format(
                  "hh:mm a"
                )
              : "NA"
        });
      }
      passengerDetails = [
        {
          name: "Booked by",
          value: leadPassengerName || "NA"
        },
        {
          name: "No. of pax",
          value: passengerCount || "NA"
        },
        !transferIncluded // Display activity start time only when transfer is not included
          ? {
              name: "Starts at",
              value: departureTimeStr
                ? departureTimeStr
                : moment(dateMillis).format("hh:mm a")
            }
          : null,
        {
          name: "Duration",
          value: totalDuration
        },
        {
          name: "Slot",
          value: getTitleCase(availabilitySlot)
        }
      ];
      bookingDetailSections = [
        {
          name: "Inclusions",
          component: (
            <View style={styles.accordionTextWrapper}>
              <HTMLView
                value={
                  inclusions ? `<div>${inclusions}</div>` : costingInclusions
                }
                stylesheet={constants.htmlStyleSheet}
              />
            </View>
          )
        },
        {
          name: "Exclusions",
          component: (
            <View style={styles.accordionTextWrapper}>
              <HTMLView
                value={
                  exclusions ? `<div>${exclusions}</div>` : costingExclusions
                }
                stylesheet={constants.htmlStyleSheet}
              />
            </View>
          )
        },
        notes
          ? {
              name: "Instructions & notes",
              component: (
                <View style={styles.accordionTextWrapper}>
                  <HTMLView
                    value={`<div>${notes}</div>`}
                    stylesheet={constants.htmlStyleSheet}
                  />
                </View>
              )
            }
          : null,
        {
          name: "About",
          component: (
            <View style={styles.accordionTextWrapper}>
              <HTMLView
                value={`<div>${longDesc}</div>`}
                stylesheet={constants.htmlStyleSheet}
              />
            </View>
          )
        }
      ];
      bookingDetails = [
        // removed temporarily since not enough data in plato
        // {
        //   name: "Booked on",
        //   value: bookedTime ? moment(bookedTime).format("DD MMM, YY") : "NA"
        // },
        // {
        //   name: "Total paid",
        //   value: publishedCost ? getLocaleString(publishedCost) : "NA"
        // },
        // {
        //   name: "Booking source",
        //   value: "Pickyourtrail"
        // }
      ];
    }
    if (voucherNotes) {
      // Add notes section if Activity notes are updated in PLATO
      bookingDetailSections.unshift({
        name: "Notes",
        component: (
          <View style={styles.accordionTextWrapper}>
            <Text style={styles.accordionText}>{voucherNotes}</Text>
          </View>
        )
      });
    }
    let lat, lon;
    /**
     * Check if pickup lat and long are present for the activity
     */
    if (latitude && longitude) {
      lat = latitude;
      lon = longitude;
    } else if (!transferIncluded) {
      /**
       * If Pickup lat and long are missing, get the activity lat and long
       * However, only if transfer is not included.
       * If transfer is included & pickup lat-long is missing simply hide the button
       */
      if (activityLatitude && activityLongitude) {
        lat = activityLatitude;
        lon = activityLongitude;
      } else if (costingLatitude && costingLongitude) {
        /**
         * If no activity lat-long is provided in PLATO voucher, get default activity lat-long from costing object
         * Again, only if transfer is not included.
         */
        lat = costingLatitude;
        lon = costingLongitude;
      }
    }
    return (
      <Fragment>
        <ParallaxScrollView
          bounces={false}
          backgroundColor="white"
          contentBackgroundColor="white"
          parallaxHeaderHeight={214 + xHeight}
          stickyHeaderHeight={48 + xHeight}
          fadeOutForeground={Platform.OS !== "android"}
          onChangeHeaderVisibility={this.headerToggle}
          renderStickyHeader={() => (
            <VoucherStickyHeader action={this.close} text={voucherTitle.text} />
          )}
          renderForeground={() => (
            <VoucherHeader
              infoText={voucherTitle.header}
              title={voucherTitle.text}
              menu={() => {}}
              onClickClose={this.close}
              image={{ uri: mainPhoto }}
            />
          )}
        >
          <View style={styles.titleSection}>
            <TitleDate date={activityTime > 0 ? activityTime : dateMillis} />

            <VoucherName name={title} />

            <VoucherSplitSection
              sections={passengerDetails}
              rightFontStyle={{ width: responsiveWidth(50) - 24 }}
            />
          </View>

          <View style={styles.arrivalSection}>
            <SectionHeader
              sectionName={transferIncluded ? "TRANSFER INFO" : "LOCATION INFO"}
              containerStyle={{ marginBottom: 0 }}
            />

            <VoucherSplitSection sections={transferDetails} />

            {_.toUpper(transferType) === "SHARED" ? (
              <TransferInfoBox
                text={constants.voucherText.sharedTransferInfo}
                containerStyle={{ marginVertical: 8 }}
              />
            ) : null}

            {free ? (
              <TransferInfoBox text={constants.voucherText.freeTransferInfo} />
            ) : transferIncluded && pickupAddress ? (
              <PickupInfoBox />
            ) : null}
            <VoucherAddressSection
              containerStyle={{ marginTop: 8 }}
              address={
                pickupAddress
                  ? pickupAddress
                  : !transferIncluded
                    ? activityAddress
                    : null
              }
            />

            <VoucherContactActionBar
              contact={contactNumber}
              location={{ lat, lon }}
            />
          </View>
          <View style={styles.bookingDetailsSection}>
            <VoucherAccordion
              sections={bookingDetailSections}
              openFirstSection={!!voucherNotes}
            />
            <VoucherSplitSection sections={bookingDetails} />
          </View>
          <ViewVoucherButton
            containerStyle={{ alignSelf: "center" }}
            voucherUrl={voucherUrl}
          />
        </ParallaxScrollView>
        {Platform.OS === "ios" && this.state.isCloseVisible ? (
          <IosCloseButton clickAction={this.close} />
        ) : null}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  titleSection: {
    marginTop: 16,
    paddingHorizontal: 24
  },
  arrivalSection: {
    marginTop: 16,
    paddingHorizontal: 24
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },
  bookingDetailsSection: {
    paddingHorizontal: 24,
    marginBottom: 24
  },
  accordionTextWrapper: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: constants.shade4
  },
  accordionText: {
    width: responsiveWidth(100) - 48,
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2
  }
});

export default ActivityVoucher;
