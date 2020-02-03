import React from "react";

import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import MaritalStatus, { IMaritalStatusData } from "../MaritalStatus";
import MaritalStatusCard from "./MaritalStatusCard";

const data: IMaritalStatusData[] = [
  {
    text: "Single",
    image: "https://i.imgur.com/ZKpwBvn.png"
  },
  {
    text: "To be married",
    image: "https://i.imgur.com/ZKpwBvn.png"
  },
  {
    text: "Married",
    image: "https://i.imgur.com/ZKpwBvn.png"
  },
  {
    text: "Other",
    image: "https://i.imgur.com/ZKpwBvn.png"
  }
];

const MaritalStatusComponentTestCases: ITestCase[] = [
  {
    title: "Marital Status",
    Component: <MaritalStatus maritalStatusData={data} />
  },
  {
    title: "Marital Status Card",
    Component: (
      <MaritalStatusCard
        imageSource={"https://i.imgur.com/ZKpwBvn.png"}
        text={"Single"}
        onPress={() => {}}
      />
    )
  }
];

export default MaritalStatusComponentTestCases;
