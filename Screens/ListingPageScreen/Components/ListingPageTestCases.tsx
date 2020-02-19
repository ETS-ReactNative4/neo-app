import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import ListingPage from "../ListingPage";

const ListingPageTestCases: ITestCase[] = [
  {
    title: "Promo landing",
    Component: <ListingPage />
  }
];

export default ListingPageTestCases;
