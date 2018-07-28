import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
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
import VoucherAccordion from "../Components/VoucherAccordion";
import IosCloseButton from "../Components/IosCloseButton";

class TransferVoucher extends Component {
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
    const xHeight = isIphoneX() ? constants.xNotchHeight : 0;
    const passengerDetails = [
      {
        name: "Lead passenger",
        value: "Mr. Shantanu Agarwal"
      },
      {
        name: "No of Passengers",
        value: "2 adults"
      },
      {
        name: "Vehicle type",
        value: "Car"
      },
      {
        name: "Type",
        value: "Private Transfer"
      }
    ];
    const arrivalDetails = [
      {
        name: "Arrival at",
        value: "Madrid Airport"
      },
      {
        name: "Arrival time",
        value: "7:45 am"
      },
      {
        name: "Pickup time",
        value: "7.45 am"
      },
      {
        name: "Meeting point",
        value: "Arrival Terminal"
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
          <VoucherStickyHeader action={this.close} text={"1242345"} />
        )}
        renderForeground={() => (
          <VoucherHeader
            infoText={`BOOKING ID`}
            title={`1242345`}
            menu={() => {}}
            onClickClose={this.close}
          />
        )}
      >
        <View style={styles.titleSection}>
          <Text style={styles.activityDate}>Sun 24</Text>

          <VoucherName name={`Airport transfer - Madrid Airport to Hotel`} />

          <VoucherSplitSection sections={passengerDetails} />
        </View>

        <View style={styles.arrivalSection}>
          <SectionHeader
            sectionName={"ARRIVAL DETAILS"}
            containerStyle={{ marginBottom: 0 }}
          />

          <VoucherSplitSection sections={arrivalDetails} />

          <SimpleButton
            text={"Contact"}
            action={() => null}
            color={"transparent"}
            containerStyle={{ width: responsiveWidth(100) - 48, marginTop: 24 }}
            textColor={constants.black2}
            hasBorder={true}
            icon={constants.trainIcon}
            iconSize={16}
          />
        </View>

        <View style={styles.accordionSection}>{/*<VoucherAccordion />*/}</View>
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
  activityDate: {
    marginBottom: 8
  },
  arrivalSection: {
    marginTop: 16,
    paddingHorizontal: 24
  },
  accordionSection: {
    paddingHorizontal: 24
  }
});

export default TransferVoucher;
