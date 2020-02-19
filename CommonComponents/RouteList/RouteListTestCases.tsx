import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import RouteList from "./RouteList";
import { StyleSheet } from "react-native";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";

const styles = StyleSheet.create({
  containerStyle: {
    margin: 24
  },
  textStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 15),
    marginHorizontal: 6
  }
});

const RouteListTestCases: ITestCase[] = [
  {
    title: "Route List",
    Component: (
      <RouteList
        cities={[
          { cityName: "Interlaken" },
          { cityName: "Zerma" },
          { cityName: "Lucerne" }
        ]}
      />
    )
  },
  {
    title: "Route List with custom font styles",
    Component: (
      <RouteList
        cities={[
          { cityName: "Interlaken" },
          { cityName: "Zerma" },
          { cityName: "Lucerne" }
        ]}
        containerStyle={styles.containerStyle}
        routeListTextStyle={styles.textStyle}
      />
    )
  }
];

export default RouteListTestCases;
