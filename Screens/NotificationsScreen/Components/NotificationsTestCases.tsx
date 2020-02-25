import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";

import CategorySection from "./CategorySection";

const NotificationsTestCases: ITestCase[] = [
  {
    title: "Category Section",
    Component: <CategorySection />
  }
];

export default NotificationsTestCases;
