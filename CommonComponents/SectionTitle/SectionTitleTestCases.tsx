import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import SectionTitle from "./SectionTitle";

const SectionTitleTestCases: ITestCase[] = [
  {
    title: "Section Title",
    Component: <SectionTitle title={"Live on-trip support"} />
  },
  {
    title: "Section Title With Short Description",
    Component: (
      <SectionTitle
        title={"Live on-trip support"}
        description={
          "We’ll use your preference info to make better and more relevant recommendations."
        }
      />
    )
  },
  {
    title: "Section Title With Longer Description",
    Component: (
      <SectionTitle
        title={"Live on-trip support"}
        description={
          "We’ll use your preference info to make better and more relevant recommendations. We’ll use your preference info to make better and more relevant recommendations."
        }
      />
    )
  }
];

export default SectionTitleTestCases;
