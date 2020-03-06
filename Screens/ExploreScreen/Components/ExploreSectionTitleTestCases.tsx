import React from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import ExploreSectionTitle from "./ExploreSectionTitle";

const ExploreSectionTitleTestCases: ITestCase[] = [
  {
    title: "Explore Section Title",
    Component: (
      <ExploreSectionTitle
        title={"HANDPICKED FOR YOU"}
        description={"Let’s tick Asia off your bucket list :)"}
      />
    )
  },
  {
    title: "Explore Section Title With Different Color",
    Component: (
      <ExploreSectionTitle
        title={"HANDPICKED FOR YOU"}
        description={"Let’s tick Asia off your bucket list :)"}
        titleColor={"rgba(255, 137, 51, 1)"}
      />
    )
  }
];

export default ExploreSectionTitleTestCases;
