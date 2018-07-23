import React, { Component } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherHeader from "../Components/VoucherHeader";
import VoucherName from "../Components/VoucherName";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { isIphoneX } from "react-native-iphone-x-helper";
import FlightCard from "./Components/FlightCard";

class FlightVoucher extends Component {
  static navigationOptions = {
    header: null
  };

  close = () => {
    this.props.navigation.goBack();
  };

  render() {
    const xHeight = isIphoneX() ? constants.xNotchHeight : 0;
    return (
      <ParallaxScrollView
        backgroundColor="white"
        contentBackgroundColor="white"
        parallaxHeaderHeight={214 + xHeight}
        stickyHeaderHeight={48 + xHeight}
        fadeOutForeground={Platform.OS !== "android"}
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
        </View>

        <FlightCard />
      </ParallaxScrollView>
    );
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

export default FlightVoucher;
