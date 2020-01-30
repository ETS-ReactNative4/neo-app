import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";

import DrawerContent from "../../TravelProfileCityScreen/Components/DrawerContent";

const TravelProfileWelcomeComponentTestCases: ITestCase[] = [
  {
    title: "Drawer Content",
    Component: <DrawerContent />
  }
];

export default TravelProfileWelcomeComponentTestCases;
