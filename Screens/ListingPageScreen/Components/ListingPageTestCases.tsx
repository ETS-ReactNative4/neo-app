import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import ListingPageFilter from "../Components/ListingPageFilter";
import { ICheckBoxData } from "../../../CommonComponents/CustomCheckBox/CustomCheckBox";

const dataInterest: ICheckBoxData[] = [
  {
    text: "Lorem Ipsum"
  },
  {
    text: "Lorem Ipsum"
  },
  {
    text: "Family Specials"
  },
  {
    text: "Beach Lovers"
  },
  {
    text: "Adrenaline Junkies"
  },
  {
    text: "Visa on arrival"
  }
];

const ListingPageTestCases: ITestCase[] = [
  {
    title: "Listing Page Filter",
    Component: <ListingPageFilter filterCheckboxData={dataInterest} />
  }
];

export default ListingPageTestCases;
