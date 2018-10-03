import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { AreaChart } from "react-native-svg-charts";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Text as SText, Defs, LinearGradient, Stop } from "react-native-svg";
import * as shape from "d3-shape";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";

class WeatherChart extends Component {
  static propTypes = {
    selectedDay: PropTypes.object.isRequired
  };

  state = {
    showDecorators: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showDecorators: true
      });
    }, 300);
  }

  render() {
    const { hourly, isToday } = this.props.selectedDay;

    const data = [],
      time = [];

    data.push(hourly[1].temperature);
    time.push("AAA");

    hourly.map((hour, index) => {
      if (index % 3 === 0) {
        data.push(hour.temperature);
        time.push(hour.time);
      }
    });

    data.push(hourly[1].temperature);
    time.push("AAA");

    data.push(0);
    time.push("AAA");

    const chartColor = "rgba(28,173,69,1)";

    const GradientIos = ({ index }) => (
      <Defs key={index}>
        <LinearGradient
          id={"gradient"}
          x1={"0%"}
          y={"0%"}
          x2={"0%"}
          y2={"100%"}
        >
          <Stop offset={"0%"} stopColor={chartColor} stopOpacity={0.3} />
          <Stop offset={"80%"} stopColor={chartColor} stopOpacity={0.2} />
          <Stop offset={"95%"} stopColor={chartColor} stopOpacity={0.05} />
          <Stop offset={"100%"} stopColor={chartColor} stopOpacity={0} />
        </LinearGradient>
      </Defs>
    );

    const GradientAndroid = ({ index }) => (
      <Defs key={index}>
        <LinearGradient
          id={"gradient"}
          x1={"0%"}
          y={"0%"}
          x2={"0%"}
          y2={"100%"}
        >
          <Stop offset={"0%"} stopColor={chartColor} stopOpacity={0.3} />
          <Stop offset={"50%"} stopColor={chartColor} stopOpacity={0.25} />
          <Stop offset={"80%"} stopColor={chartColor} stopOpacity={0.2} />
          <Stop offset={"100%"} stopColor={chartColor} stopOpacity={0} />
        </LinearGradient>
      </Defs>
    );

    const DecoratorX = ({ x, y, data }) => {
      return data.map((value, index) => {
        if (
          index === 0 ||
          index === data.length - 1 ||
          index === data.length - 2
        )
          return null;

        return (
          <SText
            fill={this.state.showDecorators ? constants.black2 : "transparent"}
            stroke="transparent"
            fontSize="11"
            fontWeight="300"
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
        if (
          index === 0 ||
          index === data.length - 1 ||
          index === data.length - 2
        )
          return null;

        return (
          <SText
            fill={this.state.showDecorators ? constants.black2 : "transparent"}
            stroke="transparent"
            fontSize="11"
            fontWeight="300"
            textAnchor="middle"
            key={index}
            x={x(index)}
            y={165}
          >
            {time[index]}
          </SText>
        );
      });
    };

    return (
      <View>
        <AreaChart
          style={{ height: 200, width: responsiveWidth(115) }}
          data={data}
          contentInset={{ top: 30, bottom: 30, left: 0, right: 0 }}
          curve={shape.curveNatural}
          svg={{ fill: "url(#gradient)" }}
        >
          <DecoratorX />
          <DecoratorY />
          {Platform.OS === "ios" ? <GradientIos /> : <GradientAndroid />}
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
