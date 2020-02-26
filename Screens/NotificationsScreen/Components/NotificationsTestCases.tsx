import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import NotificationsActionSheet from "./NotificationsActionSheet";

const NotificationsTestCases: ITestCase[] = [
  {
    title: "Notification Action Sheet",
    Component: <NotificationsActionSheet />
  }
];

export default NotificationsTestCases;
