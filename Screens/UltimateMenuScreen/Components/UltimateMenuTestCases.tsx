import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";

import UltimateMenu from "../UltimateMenu";

const menuListLoggedIn = [
  {
    name: "Explore trips",
    iconName: "heart1",
    active: true
  },
  {
    name: "My Saved Itineraries",
    iconName: "heart1",
    active: false
  },
  {
    name: "My Traveller Profile",
    iconName: "heart1",
    active: false
  },
  {
    name: "About",
    iconName: "heart1",
    active: false
  }
];

const menuListOnTripApp = [
  {
    name: "Trip mode",
    iconName: "heart1",
    active: true
  },
  {
    name: "Payments",
    iconName: "heart1",
    active: false
  },
  {
    name: "Explore trips",
    iconName: "heart1",
    active: false
  },
  {
    name: "My Saved Itineraries",
    iconName: "heart1",
    active: false
  },
  {
    name: "My Traveller Profile",
    iconName: "heart1",
    active: false
  },
  {
    name: "My Booking History",
    iconName: "heart1",
    active: false
  },
  {
    name: "About",
    iconName: "heart1",
    active: false
  }
];

const UltimateMenuTestCases: ITestCase[] = [
  {
    title: "Ultimate Menu Logged in",
    Component: (
      <UltimateMenu
        buttonName={"Complete preferences"}
        buttonAction={() => {}}
        userName={"Koushik Murali"}
        userEmailId={"koushikmurali@gmail.com"}
        menuList={menuListLoggedIn}
      />
    )
  },
  {
    title: "Ultimate Menu Sign up skipped",
    Component: (
      <UltimateMenu
        buttonName={"Complete preferences"}
        buttonAction={() => {}}
        userName={"Koushik Murali"}
        enableLogin={true}
        loginAction={() => {}}
        menuList={menuListLoggedIn}
      />
    )
  },
  {
    title: "Ultimate Menu On trip app",
    Component: (
      <UltimateMenu
        buttonName={"Edit preferences"}
        buttonAction={() => {}}
        userName={"Koushik Murali"}
        userEmailId={"koushikmurali@gmail.com"}
        menuList={menuListOnTripApp}
      />
    )
  }
];

export default UltimateMenuTestCases;
