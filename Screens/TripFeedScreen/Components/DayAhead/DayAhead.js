import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel from "../../../../CommonComponents/Carousel/Carousel";
import constants from "../../../../constants/constants";
import DayAheadBox from "./Components/DayAheadBox";
import DayAheadRow from "./Components/DayAheadRow";
import { responsiveWidth } from "react-native-responsive-dimensions";

class DayAhead extends Component {
  render() {
    const dayAhead = [{}, {}, {}];

    return (
      <View style={styles.dayAheadContainer}>
        <View style={styles.dayAheadTitleWrapper}>
          <Text style={styles.dayAheadTitle}>{"THE DAY AHEAD"}</Text>
        </View>
        <Carousel firstMargin={24}>
          {dayAhead.map((day, dayIndex) => {
            return <DayAheadBox key={dayIndex} />;
          })}
        </Carousel>
        <View style={styles.rowContainer}>
          {dayAhead.map((day, dayIndex) => {
            const isLast = dayAhead.length === dayIndex + 1;
            return <DayAheadRow key={dayIndex} isLast={isLast} />;
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dayAheadContainer: {
    marginTop: 24
  },
  dayAheadTitleWrapper: {
    height: 16,
    marginLeft: 24,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  dayAheadTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 13),
    color: constants.sixthColor
  },
  rowContainer: {
    marginHorizontal: 24,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.shade3,
    marginTop: 8
  }
});

export default DayAhead;
