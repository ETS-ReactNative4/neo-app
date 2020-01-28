import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import PortraitImage from "./PortraitImage";

const PortraitImageTestCases: ITestCase[] = [
  {
    title: "Portrait Image",
    Component: (
      <PortraitImage
        imageSource={"https://d3lf10b5gahyby.cloudfront.net/city/paris.jpg"}
      />
    )
  }
];

export default PortraitImageTestCases;
