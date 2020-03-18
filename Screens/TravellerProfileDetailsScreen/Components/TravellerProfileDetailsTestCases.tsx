import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import TravellerProfileDetails from "../TravellerProfileDetails";
import EditTravellerProfileDetails from "./EditTravellerProfileDetails";
import { ICheckBoxData } from "../../../CommonComponents/CustomCheckBox/CustomCheckBox";

const data: ICheckBoxData[] = [
  {
    text: "2 Star"
  },
  {
    text: "3 Star"
  },
  {
    text: "4 Star"
  },
  {
    text: "5 Star"
  }
];

const TravellerProfileDetailsTestCases: ITestCase[] = [
  {
    title: "Traveller Profile Details",
    Component: <TravellerProfileDetails ratingData={data} />
  },
  {
    title: "Edit Traveller Profile Details",
    Component: <EditTravellerProfileDetails />
  }
];

export default TravellerProfileDetailsTestCases;
