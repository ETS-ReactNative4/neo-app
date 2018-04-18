import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AreaChart, Grid } from "react-native-svg-charts";
import { Circle, Text as SText } from "react-native-svg";
import * as shape from "d3-shape";
import constants from "../../../constants/constants";

class WeatherChart extends Component {
  render() {
    const data = [21, 20, 27, 24, 22, 21, 18, 21];
    const time = ["10AM", "12PM", "2PM", "4PM", "6PM", "8PM"];

    const Decorator = ({ x, y, data }) => {
      return data.map((value, index) => {
        if (index === 0 || index === data.length - 1) return null;

        return (
          <SText
            fill="purple"
            stroke="transparent"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
            key={index}
            x={x(index)}
            y={y(value) - 10}
          >
            {value}
          </SText>
        );
      });
    };

    return (
      <View>
        <AreaChart
          style={{ height: 200 }}
          data={data}
          contentInset={{ top: 30, bottom: 30, left: 0, right: 0 }}
          curve={shape.curveNatural}
          svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
        >
          <Decorator />
        </AreaChart>
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
