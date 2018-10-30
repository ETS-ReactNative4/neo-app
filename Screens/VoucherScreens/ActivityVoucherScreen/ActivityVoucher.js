import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { responsiveWidth } from "react-native-responsive-dimensions";
import VoucherHeader from "../Components/VoucherHeader";
import constants from "../../../constants/constants";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherName from "../Components/VoucherName";
import VoucherSplitSection from "../Components/VoucherSplitSection";
import SectionHeader from "../../../CommonComponents/SectionHeader/SectionHeader";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import { inject, observer } from "mobx-react/custom";
import Icon from "../../../CommonComponents/Icon/Icon";
import IosCloseButton from "../Components/IosCloseButton";
import VoucherAccordion from "../Components/VoucherAccordion";
import HTMLView from "react-native-htmlview";
import dialer from "../../../Services/dialer/dialer";
import directions from "../../../Services/directions/directions";
import moment from "moment";
import TitleDate from "../Components/TitleDate";

@inject("passportDetailsStore")
@observer
class ActivityVoucher extends Component {
  static navigationOptions = {
    header: null
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
      pickupTime,
      inclusions,
      exclusions,
      contactNumber,
      bookedTime,
      activityTime
    } = activity.voucher;
    const { mainPhoto, title, notes, longDesc, latitude, longitude } = activity;
    const {
      ourSourceProvider,
      day,
      dayOfWeek,
      mon,
      totalCost
    } = activity.costing;

    const {
      leadPassengerName,
      passengerCount
    } = this.props.passportDetailsStore;

    const xHeight = isIphoneX()
      ? constants.xNotchHeight
      : Platform.OS === "ios"
        ? 20
        : 0;
    const passengerDetails = [
      {
        name: "Booked by",
        value: leadPassengerName || "NA"
      },
      {
        name: "No. of pax",
        value: passengerCount || "NA"
      },
      {
        name: "Starts at",
        value: ""
      },
      {
        name: "Duration",
        value: `${duration} mins`
      },
      {
        name: "Slot",
        value: availabilitySlot
      }
    ];
    const transferDetails = [
      {
        name: "Mode of transfer",
        value: ""
      },
      {
        name: "Pick up time",
        value: pickupTime
      }
    ];
    const bookingDetails = [
      {
        name: "Booked on",
        value: bookedTime ? moment(bookedTime).format("DD MMM, YY") : "NA"
      },
      {
        name: "Total paid",
        value: totalCost || "NA"
      },
      {
        name: "Booking source",
        value: "Pickyourtrail"
      },
      {
        name: "Booking type",
        value: ""
      }
    ];

    const bookingDetailSections = [
      {
        name: "Inclusions",
        component: (
          <View style={styles.accordionTextWrapper}>
            <HTMLView
              value={`<div>${inclusions}</div>`}
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
              value={`<div>${exclusions}</div>`}
              stylesheet={constants.htmlStyleSheet}
            />
          </View>
        )
      },
      {
        name: "Instructions & notes",
        component: (
          <View style={styles.accordionTextWrapper}>
            <HTMLView
              value={`<div>${notes}</div>`}
              stylesheet={constants.htmlStyleSheet}
            />
          </View>
        )
      },
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

    return [
      <ParallaxScrollView
        key={0}
        backgroundColor="white"
        contentBackgroundColor="white"
        parallaxHeaderHeight={214 + xHeight}
        stickyHeaderHeight={48 + xHeight}
        fadeOutForeground={Platform.OS !== "android"}
        onChangeHeaderVisibility={this.headerToggle}
        renderStickyHeader={() => (
          <VoucherStickyHeader action={this.close} text={bookingId} />
        )}
        renderForeground={() => (
          <VoucherHeader
            infoText={`BOOKING ID`}
            title={bookingId}
            menu={() => {}}
            onClickClose={this.close}
            image={{ uri: mainPhoto }}
          />
        )}
      >
        <View style={styles.titleSection}>
          <TitleDate date={activityTime} />

          <VoucherName name={title} />

          <VoucherSplitSection sections={passengerDetails} />
        </View>

        <View style={styles.arrivalSection}>
          <SectionHeader
            sectionName={"TRANSFER INFO"}
            containerStyle={{ marginBottom: 0 }}
          />

          <VoucherSplitSection sections={transferDetails} />

          <View style={styles.actionRow}>
            <SimpleButton
              text={"Directions"}
              containerStyle={{ width: responsiveWidth(43) }}
              action={() => directions({ latitude, longitude })}
              color={"transparent"}
              textColor={constants.black2}
              hasBorder={true}
              icon={constants.compassIcon}
              iconSize={16}
            />
            <SimpleButton
              text={"Contact"}
              containerStyle={{ width: responsiveWidth(43) }}
              action={() => dialer(contactNumber)}
              color={"transparent"}
              textColor={constants.black2}
              hasBorder={true}
              icon={constants.callIcon}
              iconSize={16}
            />
          </View>
        </View>
        <View style={styles.bookingDetailsSection}>
          <VoucherAccordion sections={bookingDetailSections} />
          <VoucherSplitSection sections={bookingDetails} />
        </View>
      </ParallaxScrollView>,
      Platform.OS === "ios" && this.state.isCloseVisible ? (
        <IosCloseButton key={1} clickAction={this.close} />
      ) : null
    ];
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
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4
  },
  bookingDetailsSection: {
    paddingHorizontal: 24,
    marginBottom: 24
  },
  accordionTextWrapper: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4
  },
  accordionText: {
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2
  }
});

export default ActivityVoucher;
