import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import constants from "../../../constants/constants";

class WeatherChart extends Component {
  render() {
    const data = [20, 27, 24, 22, 21, 18];
    const time = ["10AM", "12PM", "2PM", "4PM", "6PM", "8PM"];

    return (
      <View>
        <AreaChart
          style={{ height: 200 }}
          data={data}
          contentInset={{ top: 30, bottom: 30, left: 0, right: 0 }}
          curve={shape.curveNatural}
          svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
        />
        <View style={styles.xAxis}>
          {time.map((value, index) => (
            <Text style={styles.xAxisText} key={index}>
              {value}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  xAxis: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  xAxisText: {
    ...constants.font11(constants.primaryLight)
  }
});

export default WeatherChart;
