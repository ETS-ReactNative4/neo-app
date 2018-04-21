import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  StyleSheet
} from "react-native";
import constants from "../../../constants/constants";
import UpcomingCard from "./UpcomingCard";

class Upcoming extends Component {
  render() {
    return (
      <ScrollView>
        <UpcomingCard />
        <UpcomingCard />
        <UpcomingCard />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default Upcoming;
