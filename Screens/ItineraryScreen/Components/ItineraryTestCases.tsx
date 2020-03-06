import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import Itinerary from "../Itinerary";

const ItineraryTestCases: ITestCase[] = [
  {
    title: "Before costing",
    Component: <Itinerary />
  },
  {
    title: "Departing from",
    Component: <Itinerary />
  }
];

export default ItineraryTestCases;
