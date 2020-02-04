import React, { useState } from "react";
import { ITestCase } from "../../../TypeInterfaces/TestCases/ITestCases";
import AgentLoginTitle from "./AppLoginTitle";
import { Alert, StyleSheet } from "react-native";
import PhoneNumberInput from "./PhoneNumberInput";
import OtpInput from "./OtpInput";

const PhoneNumberWrapper = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [countryFlag, setCountryFlag] = useState<string>("🇮🇳");

  const updatePhoneNumber = (newNumber: string) => setPhoneNumber(newNumber);

  const onCountryCodeChange = (ccode: string, flagEmoji: string) => {
    setCountryCode(ccode);
    setCountryFlag(flagEmoji);
  };

  return (
    <PhoneNumberInput
      isLoading={true}
      phoneNumber={phoneNumber}
      onChangeText={updatePhoneNumber}
      countryCode={countryCode}
      placeholder="Phone number"
      emoji={countryFlag}
      containerStyle={styles.phoneNumberWrapper}
      onCountryCodeChange={onCountryCodeChange}
    />
  );
};

const OtpInputWrapper = () => {
  const [code, setCode] = useState<string>("");

  const updateCode = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <OtpInput
      code={code}
      onInputChange={updateCode}
      onCodeFilled={updateCode}
    />
  );
};

const AppLoginTestCases: ITestCase[] = [
  {
    title: "Agent Login Screen Title",
    Component: <AgentLoginTitle skipAction={() => Alert.alert("skipped!")} />
  },
  {
    title: "Phone Number Input",
    Component: <PhoneNumberWrapper />
  },
  {
    title: "OTP Input",
    Component: <OtpInputWrapper />
  }
];

const styles = StyleSheet.create({
  phoneNumberWrapper: { backgroundColor: "black" }
});

export default AppLoginTestCases;
