import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AreaChart } from "react-native-svg-charts";
import { Text as SText, Defs, LinearGradient, Stop } from "react-native-svg";
import * as shape from "d3-shape";
import constants from "../../../constants/constants";

class WeatherChart extends Component {
  state = {
    showDecorators: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showDecorators: true
      });
    }, 100);
  }

  render() {
    const data = [21, 20, 27, 24, 22, 21, 18, 21];
    const time = ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"];

    const Gradient = ({ index }) => (
      <Defs key={index}>
        <LinearGradient
          id={"gradient"}
          x1={"0%"}
          y={"0%"}
          x2={"0%"}
          y2={"100%"}
        >
          <Stop offset={"0%"} stopColor={"rgb(255,215,0)"} stopOpacity={0.8} />
          <Stop offset={"100%"} stopColor={"rgb(255,215,0)"} stopOpacity={0} />
        </LinearGradient>
      </Defs>
    );

    const DecoratorX = ({ x, y, data }) => {
      return data.map((value, index) => {
        if (index === 0 || index === data.length - 1) return null;

        return (
          <SText
            fill={this.state.showDecorators ? constants.black2 : "transparent"}
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

    const DecoratorY = ({ x, y, data }) => {
      return data.map((value, index) => {
        if (index === 0 || index === data.length - 1) return null;

        return (
          <SText
            fill={this.state.showDecorators ? constants.black2 : "transparent"}
            stroke="transparent"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
            key={index}
            x={x(index)}
            y={198}
          >
            {time[index]}
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
          svg={{ fill: "url(#gradient)" }}
        >
          <DecoratorX />
          <DecoratorY />
          <Gradient />
        </AreaChart>
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
