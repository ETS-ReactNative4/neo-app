import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import SearchScreen from "../SearchScreen";

const SearchScreenTestCases: ITestCase[] = [
  {
    title: "Search Screen",
    Component: <SearchScreen />
  }
];

export default SearchScreenTestCases;
