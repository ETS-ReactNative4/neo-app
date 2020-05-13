import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import UserProfileAnimation from "./UserProfileAnimation";

const UserProfileAnimationTestCases: ITestCase[] = [
  {
    title: "User Profile Animation Screen",
    Component: <UserProfileAnimation />
  }
];

export default UserProfileAnimationTestCases;
