import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import MaritalStatusCard from "./MaritalStatusCard";
import MaritalStatusActionSheet from "./MaritalStatusActionSheet";
import { ICheckBoxData } from "../../../CommonComponents/CustomCheckBox/CustomCheckBox";

const data: ICheckBoxData[] = [
  {
    text: "Senior Citizens"
  },
  {
    text: "Adults"
  },
  {
    text: "Teenagers"
  },
  {
    text: "Kids below 7"
  },
  {
    text: "Infants"
  }
];

const MaritalStatusComponentTestCases: ITestCase[] = [
  {
    title: "Marital Status Card",
    Component: (
      <MaritalStatusCard
        imageSource={"https://i.imgur.com/ZKpwBvn.png"}
        text={"Single"}
        onPress={() => {}}
      />
    )
  },
  {
    title: "Marital Status Action Sheet",
    Component: <MaritalStatusActionSheet checkboxData={data} />
  }
];

export default MaritalStatusComponentTestCases;
