import React, { Component } from "react";
import {
  View,
  Animated,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import constants from "../../../constants/constants";
import VoucherHeader from "../Components/VoucherHeader";

class TransferVoucher extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <VoucherHeader />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

export default TransferVoucher;
