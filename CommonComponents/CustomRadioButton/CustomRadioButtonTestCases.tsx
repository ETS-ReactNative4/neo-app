import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import CustomRadioButton from "./CustomRadioButton";

const options = [
  "All Destinations",
  "Australia",
  "Austria",
  "Bali",
  "Cambodia",
  "Dubai",
  "Europe",
  "France",
  "Germany"
];

/**
 * TODO: The Custom radio button UI only complete. Functionality not be done.
 * @author Suhail
 */

const CustomRadioButtonWrapper = () => {
  return <CustomRadioButton options={options} />;
};

const CustomRadioButtonTestCases: ITestCase[] = [
  {
    title: "Custon Radio Button",
    Component: <CustomRadioButtonWrapper />
  }
];

export default CustomRadioButtonTestCases;
