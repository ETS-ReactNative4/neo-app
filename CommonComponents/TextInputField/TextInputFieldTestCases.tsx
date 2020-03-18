import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import TextInputField from "./TextInputField";
import { Alert } from "react-native";

const TextInputFieldWrapper = () => {
  const [name, onChangeName] = React.useState("Koushik Murali");
  return (
    <TextInputField
      label={"NAME"}
      value={name}
      onChangeText={text => onChangeName(text)}
      placeholder="Name"
      hasError={false}
    />
  );
};

const SecondaryTextInputFieldWrapper = () => {
  const [city, onChangeCity] = React.useState("Chennai");

  return (
    <TextInputField
      label={"CITY OF DEPARTURE"}
      value={city}
      onChangeText={text => onChangeCity(text)}
      placeholder="City of Departure"
      hasError={false}
      secondaryText={"GET LOCATION"}
      secondaryTextAction={() => Alert.alert("Click GET LOCATION")}
    />
  );
};

const TextInputFieldTestCases: ITestCase[] = [
  {
    title: "Text Input Field",
    Component: <TextInputFieldWrapper />
  },
  {
    title: "Text Input Field With Secondary Text",
    Component: <SecondaryTextInputFieldWrapper />
  }
];

export default TextInputFieldTestCases;
