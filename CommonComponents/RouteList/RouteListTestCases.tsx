import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import RouteList from "./RouteList";

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
  }
];

export default RouteListTestCases;
