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
        <View style={styles.rowWrapper}>
          <View style={styles.rowContainer}>
            {dayAhead.map((day, dayIndex) => {
              const isLast = dayAhead.length === dayIndex + 1;
              return <DayAheadRow key={dayIndex} isLast={isLast} />;
            })}
          </View>
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
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 8,
    ...constants.elevationFive
  },
  rowWrapper: {
    marginHorizontal: 24
  }
});

export default DayAhead;
