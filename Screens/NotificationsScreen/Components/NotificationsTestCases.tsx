import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import NotificationsActionSheet from "./NotificationsActionSheet";
import TripDetails from "./TripDetails";

const NotificationsTestCases: ITestCase[] = [
  {
    title: "Notification Action Sheet",
    Component: <NotificationsActionSheet />
  },
  {
    title: "Notification Itinerary Details",
    Component: <TripDetails />
  }
];

export default NotificationsTestCases;
